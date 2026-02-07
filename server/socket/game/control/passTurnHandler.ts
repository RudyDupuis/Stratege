import type { Callback } from "../../utils/types";
import { games } from "../record/gameRecords";
import { checkIfGameExistAndIfIsPlayerTurn } from "../../utils/game/gameChecks";
import { rooms } from "../../room/record/roomRecords";
import aiManager from "~~/server/ai/aiManager";
import {
  deleteGameTurnTimer,
  setTurnTimer
} from "../record/gameTurnTimerRecords";
import type { Server, Socket } from "socket.io";

export function passTurnHandler(socket: Socket, io: Server) {
  socket.on(
    "passTurn",
    (roomId: string, player: PlayerRole, callback: Callback) => {
      const gameState = games[roomId];

      try {
        checkIfGameExistAndIfIsPlayerTurn(gameState, player);
      } catch (error) {
        return callback({ error: error });
      }

      passTurnAndHandleTurnTimer(gameState, roomId, io);

      if (isDefined(rooms[roomId]) && rooms[roomId].type === RoomType.AI) {
        aiManager(roomId, io, callback);
      }
    }
  );
}

export function passTurnAndHandleTurnTimer(
  gameState: GameState,
  roomId: string,
  io: Server
) {
  passTurn(gameState, roomId, io);

  if (isDefined(rooms[roomId]) && rooms[roomId].type !== RoomType.AI) {
    deleteGameTurnTimer(roomId);
    setTurnTimer(roomId, io);
  }
}

export function passTurn(gameState: GameState, roomId: string, io: Server) {
  gameState.turn += 1;
  gameState.resetRemainingMovesPawns();
  gameState.resetLastActionAndPositionPawns();
  io.to(roomId).emit("gameState", gameState);
}
