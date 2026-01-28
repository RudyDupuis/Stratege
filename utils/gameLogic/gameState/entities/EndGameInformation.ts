import type { User } from "#auth-utils";
import type EndGameInformationDto from "./EndGameInformationDto";
import type { PlayerRole } from "./PlayerRoleEnum";

export default class EndGameInformation implements EndGameInformationDto {
  constructor(
    public winner: {
      playerRole: PlayerRole;
      user?: User;
    },
    public loser: {
      playerRole: PlayerRole;
      user?: User;
    }
  ) {}
}
