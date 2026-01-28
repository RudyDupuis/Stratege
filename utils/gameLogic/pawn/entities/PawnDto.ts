import type { Action, ReceivedAction } from "./ActionEnum";
import type { PlayerRole } from "../../gameState/entities/PlayerRoleEnum";
import type PawnPositionDto from "../../pawnPosition/entities/PawnPositionDto";
import type { Orientation } from "./OrientationEnum";

export default interface PawnDto {
  id: string;
  owner: PlayerRole;
  isAlive: boolean;
  remainingMove: 0 | 1 | 2;
  orientation: Orientation;
  position: PawnPositionDto;
  lastPosition?: PawnPositionDto;
  lastAction?: Action | ReceivedAction;
}
