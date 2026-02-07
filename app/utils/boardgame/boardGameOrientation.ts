export default function boardGameOrientation(player: PlayerRole) {
  return player === PlayerRole.Player1 ? "rotate-0" : "rotate-180";
}
