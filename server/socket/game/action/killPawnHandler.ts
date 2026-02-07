import type { PawnDto, PawnPositionDto } from "#imports";
import type { Server, Socket } from "socket.io";
import type { Callback } from "../../utils/types";
import { games } from "../record/gameRecords";
import pawnDtoToEntity from "~~/utils/gameLogic/pawn/mappers/pawnMapper";
import pawnPositionDtoToEntity from "~~/utils/gameLogic/pawnPosition/mappers/pawnPositionMapper";
import {
  checkIfGameExistAndIfIsPlayerTurn,
  checkIfIsPawnOwner,
  checkPawnPositionsAvailable
} from "../../utils/game/gameChecks";
import calculatePawnRemainingMoves from "../../utils/game/calculatePawnRemainingMoves";
import endGameHandler from "../../utils/game/endGameHandler";

export default function killPawnHandler(socket: Socket, io: Server) {
  socket.on(
    "killPawn",
    (
      roomId: string,
      player: PlayerRole,
      pawnDto: PawnDto,
      desiredPawnPositionForKillDto: PawnPositionDto,
      callback: Callback
    ) => {
      const gameState = games[roomId];
      const pawn = pawnDtoToEntity(pawnDto);
      const desiredPawnPositionForKill = pawnPositionDtoToEntity(
        desiredPawnPositionForKillDto
      );

      killPawn(
        gameState,
        roomId,
        player,
        pawn,
        desiredPawnPositionForKill,
        io,
        callback
      );
    }
  );
}

export function killPawn(
  gameState: GameState,
  roomId: string,
  player: PlayerRole,
  pawn: Pawn,
  desiredPawnPositionForKill: PawnPosition,
  io: Server,
  callback: Callback
) {
  try {
    checkIfGameExistAndIfIsPlayerTurn(gameState, player);
    checkIfIsPawnOwner(gameState, pawn, player);
  } catch (error) {
    return callback({ error: error });
  }

  const positionsAvailableForKilling =
    gameState.determineAvailablePositionsForActions(
      pawn,
      player
    ).positionsAvailableForKilling;

  try {
    checkPawnPositionsAvailable(
      positionsAvailableForKilling,
      desiredPawnPositionForKill
    );
  } catch (error) {
    return callback({ error: error });
  }

  const pawnToKill = gameState.findPawnByPosition(desiredPawnPositionForKill);

  if (isUndefined(pawnToKill)) {
    return callback({ error: "Le pion à prendre n'existe pas" });
  }
  if (pawnToKill.owner === player) {
    return callback({ error: "Le pion à prendre appartient au même joueur" });
  }
  calculatePawnRemainingMoves(pawn, desiredPawnPositionForKill);

  pawnToKill.isAlive = false;
  pawnToKill.lastPosition = new PawnPosition(
    pawnToKill.position.row,
    pawnToKill.position.col
  );
  pawnToKill.position = new PawnPosition(-1, -1);
  pawnToKill.lastAction = ReceivedAction.IsKilled;

  pawn.lastPosition = new PawnPosition(pawn.position.row, pawn.position.col);
  pawn.position = desiredPawnPositionForKill;
  pawn.lastAction = Action.Kill;

  gameState.updatePawn(pawnToKill);
  gameState.updatePawn(pawn);

  gameState.updateBoard();

  io.to(roomId).emit("gameState", gameState);
  endGameHandler(roomId, io, callback);
}
