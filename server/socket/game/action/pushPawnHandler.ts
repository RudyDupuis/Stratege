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

export default function pushPawnHandler(socket: Socket, io: Server) {
  socket.on(
    "pushPawn",
    (
      roomId: string,
      player: PlayerRole,
      pawnDto: PawnDto,
      desiredPushedPawnPositionDto: PawnPositionDto,
      callback: Callback
    ) => {
      const gameState = games[roomId];
      const pawn = pawnDtoToEntity(pawnDto);
      const desiredPushedPawnPosition = pawnPositionDtoToEntity(
        desiredPushedPawnPositionDto
      );

      pushPawn(
        gameState,
        roomId,
        player,
        pawn,
        desiredPushedPawnPosition,
        io,
        callback
      );
    }
  );
}

export function pushPawn(
  gameState: GameState,
  roomId: string,
  player: PlayerRole,
  pawn: Pawn,
  desiredPushedPawnPosition: PawnPosition,
  io: Server,
  callback: Callback
) {
  try {
    checkIfGameExistAndIfIsPlayerTurn(gameState, player);
    checkIfIsPawnOwner(gameState, pawn, player);
  } catch (error) {
    return callback({ error: error });
  }

  const positionsAvailableForPushing =
    gameState.determineAvailablePositionsForActions(
      pawn,
      player
    ).positionsAvailableForPushing;

  try {
    checkPawnPositionsAvailable(
      positionsAvailableForPushing,
      desiredPushedPawnPosition
    );
  } catch (error) {
    return callback({ error: error });
  }

  //Is used to calculate the position of the pion to push
  const minCol = Math.min(pawn.position.col, desiredPushedPawnPosition.col);
  const maxCol = Math.max(pawn.position.col, desiredPushedPawnPosition.col);
  const minRow = Math.min(pawn.position.row, desiredPushedPawnPosition.row);
  const maxRow = Math.max(pawn.position.row, desiredPushedPawnPosition.row);

  let pawnToPushPosition: PawnPosition | undefined = undefined;

  if (maxCol - minCol > 0) {
    pawnToPushPosition = new PawnPosition(minRow, minCol + 1);
  }
  if (maxRow - minRow > 0) {
    pawnToPushPosition = new PawnPosition(minRow + 1, minCol);
  }

  if (isUndefined(pawnToPushPosition)) {
    console.error(
      "Le pion ne peut pas aller dans cette direction" +
        JSON.stringify(pawn) +
        " " +
        JSON.stringify(pawnToPushPosition)
    );
    throw new Error("Le pion ne peut pas aller dans cette direction");
  }

  const pawnToPush = gameState.findPawnByPosition(pawnToPushPosition);

  if (isUndefined(pawnToPush)) {
    return callback({ error: "Le pion à pousser n'existe pas" });
  }

  calculatePawnRemainingMoves(pawn, pawnToPushPosition);

  pawnToPush.lastPosition = new PawnPosition(
    pawnToPush.position.row,
    pawnToPush.position.col
  );
  pawnToPush.position = desiredPushedPawnPosition;
  pawnToPush.lastAction = ReceivedAction.IsPushed;

  pawn.lastPosition = new PawnPosition(pawn.position.row, pawn.position.col);
  pawn.position = pawnToPush.lastPosition;
  pawn.lastAction = Action.Push;

  gameState.updatePawn(pawnToPush);
  gameState.updatePawn(pawn);

  gameState.updateBoard();

  io.to(roomId).emit("gameState", gameState);
}
