import type { Server } from "socket.io";
import type { Callback } from "../socket/utils/types";
import { games } from "../socket/game/record/gameRecords";
import { rooms } from "../socket/room/record/roomRecords";
import { loadModel, predictAction } from "./modelHandler";
import boardAndActionsDataToStateMatriceAndActionsMatrice from "./mappers/boardAndActionsDataToStateMatriceAndActionsMatrice";
import actionMatriceToActionInfos from "./mappers/actionMatriceToActionInfos";
import { movePawn } from "../socket/game/action/movePawnHandler";
import { killPawn } from "../socket/game/action/killPawnHandler";
import { pullPawn } from "../socket/game/action/pullPawnHandler";
import { pushPawn } from "../socket/game/action/pushPawnHandler";
import { rotatePawn } from "../socket/game/action/rotatePawnHandler";
import { passTurnAndHandleTurnTimer } from "../socket/game/control/passTurnHandler";

export default async function playAMoveRecursively(
  roomId: string,
  io: Server,
  callback: Callback
) {
  const gameState = games[roomId];
  const aiRole = PlayerRole.Player2;
  const aiLevel = isDefined(rooms[roomId]) ? rooms[roomId].aiLevel : undefined;

  if (
    isDefined(gameState.winner) ||
    gameState.determinePlayerBasedOnTurn() !== aiRole ||
    isUndefined(aiLevel)
  ) {
    return;
  }

  const model = await loadModel(aiLevel);

  const { stateMatrice, actionsMatrice } =
    boardAndActionsDataToStateMatriceAndActionsMatrice(gameState, aiRole);
  const chosenActionMatrice = await predictAction(
    model,
    stateMatrice,
    actionsMatrice
  );
  const chosenActionInformations = actionMatriceToActionInfos(
    chosenActionMatrice,
    gameState
  );

  switch (chosenActionInformations.action) {
    case Action.Move:
      movePawn(
        gameState,
        roomId,
        aiRole,
        chosenActionInformations.pawn!,
        chosenActionInformations.position!,
        io,
        callback
      );
      break;
    case Action.Kill:
      killPawn(
        gameState,
        roomId,
        aiRole,
        chosenActionInformations.pawn!,
        chosenActionInformations.position!,
        io,
        callback
      );
      break;
    case Action.Pull:
      pullPawn(
        gameState,
        roomId,
        aiRole,
        chosenActionInformations.pawn!,
        chosenActionInformations.position!,
        io,
        callback
      );
      break;
    case Action.Push:
      pushPawn(
        gameState,
        roomId,
        aiRole,
        chosenActionInformations.pawn!,
        chosenActionInformations.position!,
        io,
        callback
      );
      break;
    case Action.Rotate:
      rotatePawn(
        gameState,
        roomId,
        aiRole,
        chosenActionInformations.pawn!,
        chosenActionInformations.orientation!,
        io,
        callback
      );
      break;
    case "passTurn":
      passTurnAndHandleTurnTimer(gameState, roomId, io);
      break;
  }

  setTimeout(() => {
    playAMoveRecursively(roomId, io, callback);
  }, 1000);
}
