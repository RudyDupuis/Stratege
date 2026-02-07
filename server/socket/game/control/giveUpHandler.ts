import type { Server, Socket } from "socket.io";
import type { Callback } from "../../utils/types";
import { games } from "../record/gameRecords";
import endGameHandler from "../../utils/game/endGameHandler";

export default function giveUpHandler(socket: Socket, io: Server) {
  socket.on(
    "giveUp",
    (roomId: string, player: PlayerRole, callback: Callback) => {
      const gameState = games[roomId];

      if (isUndefined(gameState)) {
        console.error(
          "L'état de la partie est introuvable" + JSON.stringify(gameState)
        );
        return callback(new Error("L'état de la partie est introuvable"));
      }

      gameState.winner =
        player === PlayerRole.Player1 ? PlayerRole.Player2 : PlayerRole.Player1;

      endGameHandler(roomId, io, callback);
    }
  );
}
