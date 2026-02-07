export default function calculatePawnRemainingMoves(
  pawn: Pawn,
  desiredPawnPosition: PawnPosition
) {
  const moveDistance =
    Math.abs(pawn.position.row - desiredPawnPosition.row) +
    Math.abs(pawn.position.col - desiredPawnPosition.col);

  pawn.remainingMove -= moveDistance;
}
