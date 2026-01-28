import { isUndefined } from "../../../types/TypeGuard";
import type PawnPosition from "../../pawnPosition/entities/PawnPosition";
import type GameState from "../entities/GameState";

export default function findPawnByPosition(
  boardPawns: GameState["boardPawns"],
  pawnPosition: PawnPosition
) {
  const pawn = boardPawns.find(
    (pawn) =>
      pawn.position.row === pawnPosition.row &&
      pawn.position.col === pawnPosition.col &&
      pawn.isAlive
  );

  if (isUndefined(pawn)) {
    throw new Error("Une erreur est survenue lors de la recherche du pion.");
  }

  return pawn;
}
