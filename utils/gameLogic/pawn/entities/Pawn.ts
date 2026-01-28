import type { Action, ReceivedAction } from "./ActionEnum";
import type { PlayerRole } from "../../gameState/entities/PlayerRoleEnum";
import type PawnPosition from "../../pawnPosition/entities/PawnPosition";
import type { Orientation } from "./OrientationEnum";
import type PawnDto from "./PawnDto";

export default class Pawn implements PawnDto {
  constructor(
    public id: string,
    public owner: PlayerRole,
    public isAlive: boolean,
    public remainingMove: 0 | 1 | 2,
    public orientation: Orientation,
    public position: PawnPosition,
    public lastPosition?: PawnPosition,
    public lastAction?: Action | ReceivedAction
  ) {}
}
