import type { User } from "#auth-utils";
import type { PlayerRole } from "./PlayerRoleEnum";

export default interface EndGameInformationDto {
  winner: {
    playerRole: PlayerRole;
    user?: User;
  };
  loser: {
    playerRole: PlayerRole;
    user?: User;
  };
}
