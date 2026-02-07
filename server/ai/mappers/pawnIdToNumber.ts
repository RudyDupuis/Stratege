export default function pawnIdToNumber(pawn: Pawn) {
  return {
    player: pawn.owner === PlayerRole.Player1 ? 1 : 2,
    number: parseInt(pawn.id.split("-")[1])
  };
}
