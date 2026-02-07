import type { ActionWithPassTurn } from "./boardAndActionsDataToStateMatriceAndActionsMatrice";
import pawnIdToNumber from "./pawnIdToNumber";

export default function actionToActionMatrice(
  action: ActionWithPassTurn,
  pawn?: Pawn,
  position?: PawnPosition,
  orientation?: Orientation
) {
  return [
    isDefined(pawn) ? pawnIdToNumber(pawn).player : 0,
    isDefined(pawn) ? pawnIdToNumber(pawn).number : 0,
    action === Action.Move ? 1 : 0,
    action === Action.Kill ? 1 : 0,
    action === Action.Push ? 1 : 0,
    action === Action.Pull ? 1 : 0,
    action === Action.Rotate ? 1 : 0,
    action === "passTurn" ? 1 : 0,
    isDefined(position) ? position.row : 0,
    isDefined(position) ? position.col : 0,
    orientation === Orientation.NE ? 1 : 0,
    orientation === Orientation.NW ? 1 : 0,
    orientation === Orientation.SE ? 1 : 0,
    orientation === Orientation.SW ? 1 : 0
  ];
}
