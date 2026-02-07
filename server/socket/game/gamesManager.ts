import type { Server, Socket } from "socket.io";
import { passTurnHandler } from "./control/passTurnHandler";
import giveUpHandler from "./control/giveUpHandler";
import movePawnHandler from "./action/movePawnHandler";
import killPawnHandler from "./action/killPawnHandler";
import pushPawnHandler from "./action/pushPawnHandler";
import pullPawnHandler from "./action/pullPawnHandler";
import rotatePawnHandler from "./action/rotatePawnHandler";

export function gameManager(socket: Socket, io: Server) {
  passTurnHandler(socket, io);
  giveUpHandler(socket, io);
  movePawnHandler(socket, io);
  killPawnHandler(socket, io);
  pushPawnHandler(socket, io);
  pullPawnHandler(socket, io);
  rotatePawnHandler(socket, io);
}
