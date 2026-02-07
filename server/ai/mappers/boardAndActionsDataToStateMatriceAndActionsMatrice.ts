import actionToActionMatrice from "./actionToActionMatrice";
import pawnIdToNumber from "./pawnIdToNumber";

export type ActionWithPassTurn = Action | "passTurn";

export default function boardAndActionsDataToStateMatriceAndActionsMatrice(
  gameState: GameState,
  aiRole: PlayerRole
) {
  const pawnsPositionsOnBoardMatrice: number[] = [];

  gameState.board.forEach((row: (Pawn | null)[]) => {
    row.forEach((pawn: Pawn | null) => {
      if (pawn === null) {
        pawnsPositionsOnBoardMatrice.push(0);
        pawnsPositionsOnBoardMatrice.push(0);
      } else {
        pawnsPositionsOnBoardMatrice.push(pawnIdToNumber(pawn).player);
        pawnsPositionsOnBoardMatrice.push(pawnIdToNumber(pawn).number);
      }
    });
  });

  const pawnsInfosMatrice: number[] = [];

  gameState.boardPawns.forEach((pawn: Pawn) => {
    pawnsInfosMatrice.push(pawnIdToNumber(pawn).player);
    pawnsInfosMatrice.push(pawnIdToNumber(pawn).number);
    pawnsInfosMatrice.push(pawn.isAlive ? 1 : 0);
    pawnsInfosMatrice.push(pawn.remainingMove);
    pawnsInfosMatrice.push(pawn.orientation === Orientation.NE ? 1 : 0);
    pawnsInfosMatrice.push(pawn.orientation === Orientation.NW ? 1 : 0);
    pawnsInfosMatrice.push(pawn.orientation === Orientation.SE ? 1 : 0);
    pawnsInfosMatrice.push(pawn.orientation === Orientation.SW ? 1 : 0);
  });

  const stateMatrice = [...pawnsPositionsOnBoardMatrice, ...pawnsInfosMatrice];

  const playerPawns = gameState.boardPawns.filter((pawn: Pawn) => {
    return pawn.owner === aiRole && pawn.isAlive;
  });

  //Each action is merged with board infos
  const actionsMatrice: number[][] = [];

  playerPawns.forEach((pawn: Pawn) => {
    const availablePositionsForActions =
      gameState.determineAvailablePositionsForActions(pawn, aiRole);

    availablePositionsForActions.positionsAvailableForMoving.forEach(
      (position: PawnPosition) =>
        actionsMatrice.push(actionToActionMatrice(Action.Move, pawn, position))
    );

    availablePositionsForActions.positionsAvailableForKilling.forEach(
      (position: PawnPosition) =>
        actionsMatrice.push(actionToActionMatrice(Action.Kill, pawn, position))
    );

    availablePositionsForActions.positionsAvailableForPushing.forEach(
      (position: PawnPosition) =>
        actionsMatrice.push(actionToActionMatrice(Action.Push, pawn, position))
    );

    availablePositionsForActions.positionsAvailableForPulling.forEach(
      (position: PawnPosition) =>
        actionsMatrice.push(actionToActionMatrice(Action.Pull, pawn, position))
    );

    if (pawn.lastAction !== Action.Rotate) {
      for (const orientation of Object.values(Orientation)) {
        if (orientation !== pawn.orientation) {
          actionsMatrice.push(
            actionToActionMatrice(Action.Rotate, pawn, undefined, orientation)
          );
        }
      }
    }
  });

  actionsMatrice.push(actionToActionMatrice("passTurn"));

  return { stateMatrice, actionsMatrice };
}
