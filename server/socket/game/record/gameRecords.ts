import type { Server } from "socket.io";
import type { Callback } from "../../utils/types";
import { deleteGameGiveUpTimer } from "./gameGiveUpTimerRecord";
import { rooms } from "../../room/record/roomRecords";
import { setTurnTimer } from "./gameTurnTimerRecords";

export const games: Record<string, GameState> = {};

export function createOrRetrieveGame(
  roomId: string,
  io: Server,
  callback: Callback
) {
  if (isDefined(games[roomId])) {
    if (isDefined(games[roomId].winner)) {
      return callback({ error: "La partie est finie" });
    }

    deleteGameGiveUpTimer(roomId);
    return io.to(roomId).emit("gameState", games[roomId]);
  }

  const newGame = new GameState(1, initialBoardPawns());

  games[roomId] = newGame;
  io.to(roomId).emit("gameState", newGame);

  if (isDefined(rooms[roomId]) && rooms[roomId].type !== RoomType.AI) {
    setTurnTimer(roomId, io);
  }
}

export function deleteGame(roomId: string) {
  // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
  delete games[roomId];
}
