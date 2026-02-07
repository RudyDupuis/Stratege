import type { Server } from "socket.io";
import type { Callback } from "../types";
import { games } from "../../game/record/gameRecords";
import { rooms } from "../../room/record/roomRecords";
import { deleteGameTurnTimer } from "../../game/record/gameTurnTimerRecords";

export default async function endGameHandler(
  roomId: string,
  io: Server,
  callback: Callback
) {
  const gameState = games[roomId];
  const room = rooms[roomId];

  if (isUndefined(gameState) || isUndefined(room)) {
    return;
  }

  gameState.checkIfThereIsAWinner();
  const winnerRole = gameState.winner;

  if (isDefined(winnerRole)) {
    deleteGameTurnTimer(roomId);

    const playersInfo = isDefined(rooms[roomId])
      ? rooms[roomId].playersInfo
      : [];

    const winningPlayerInfo = playersInfo.find(
      (player) => player.role === winnerRole
    );
    const losingPlayerInfo = playersInfo.find(
      (player) => player.role !== winnerRole
    );

    if (isUndefined(winningPlayerInfo) || isUndefined(losingPlayerInfo)) {
      return callback({
        error:
          "Erreur lors de la récupération des informations des joueurs en fin partie"
      });
    }

    if (isDefined(rooms[roomId]) && rooms[roomId].type !== RoomType.Public) {
      return io.to(roomId).emit(
        "endGameInformation",
        endGameInformationToDto({
          winner: {
            playerRole: winningPlayerInfo.role
          },
          loser: {
            playerRole: losingPlayerInfo.role
          }
        })
      );
    }

    const winningPlayer = await prisma.user.findUnique({
      where: {
        keycloakId: winningPlayerInfo.userId
      }
    });

    const losingPlayer = await prisma.user.findUnique({
      where: {
        keycloakId: losingPlayerInfo.userId
      }
    });

    if (isNull(winningPlayer) || isNull(losingPlayer)) {
      return callback({
        error: "Erreur lors de la récupération des joueurs en fin partie"
      });
    }

    await prisma.$transaction([
      prisma.user.update({
        where: { keycloakId: winningPlayerInfo.userId },
        data: {
          eloScore: calculateEloScore(
            winningPlayer.eloScore,
            losingPlayer.eloScore,
            true
          )
        }
      }),
      prisma.user.update({
        where: { keycloakId: losingPlayerInfo.userId },
        data: {
          eloScore: calculateEloScore(
            losingPlayer.eloScore,
            winningPlayer.eloScore,
            false
          )
        }
      })
    ]);

    const [updatedWinner, updatedLoser] = await Promise.all([
      prisma.user.findUnique({
        where: { keycloakId: winningPlayerInfo.userId }
      }),
      prisma.user.findUnique({ where: { keycloakId: losingPlayerInfo.userId } })
    ]);

    if (isNull(updatedWinner) || isNull(updatedLoser)) {
      return callback({
        error: "Erreur lors de la récupération des joueurs en fin partie"
      });
    }

    io.to(roomId).emit(
      "endGameInformation",
      endGameInformationToDto({
        winner: {
          playerRole: winningPlayerInfo.role,
          user: updatedWinner
        },
        loser: {
          playerRole: losingPlayerInfo.role,
          user: updatedLoser
        }
      })
    );
  }
}

function calculateEloScore(
  playerElo: number,
  opponentElo: number,
  didPlayerWin: boolean
) {
  const K = 32;
  const expectedScore = 1 / (1 + Math.pow(10, (opponentElo - playerElo) / 400));
  return Math.round(playerElo + K * ((didPlayerWin ? 1 : 0) - expectedScore));
}
