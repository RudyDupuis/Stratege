import type { PawnDto } from "#imports";
import type { Server, Socket } from "socket.io";
import type { Callback } from "../../utils/types";
import { games } from "../record/gameRecords";
import pawnDtoToEntity from "~~/utils/gameLogic/pawn/mappers/pawnMapper";
import {
  checkIfGameExistAndIfIsPlayerTurn,
  checkIfIsPawnOwner
} from "../../utils/game/gameChecks";

export default function rotatePawnHandler(socket: Socket, io: Server) {
  socket.on(
    "rotatePawn",
    (
      roomId: string,
      player: PlayerRole,
      pawnDto: PawnDto,
      orientation: Orientation,
      callback: Callback
    ) => {
      const gameState = games[roomId];
      const pawn = pawnDtoToEntity(pawnDto);

      rotatePawn(gameState, roomId, player, pawn, orientation, io, callback);
    }
  );
}

export function rotatePawn(
  gameState: GameState,
  roomId: string,
  player: PlayerRole,
  pawn: Pawn,
  orientation: Orientation,
  io: Server,
  callback: Callback
) {
  try {
    checkIfGameExistAndIfIsPlayerTurn(gameState, player);
    checkIfIsPawnOwner(gameState, pawn, player);
  } catch (error) {
    return callback({ error: error });
  }

  pawn.orientation = orientation;
  pawn.lastAction = Action.Rotate;

  gameState.updatePawn(pawn);

  io.to(roomId).emit("gameState", gameState);
}
