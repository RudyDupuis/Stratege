import type { Server, Socket } from "socket.io";
import createPrivateRoomHandler from "./handlers/createPrivateRoomHandler";
import searchPublicRoomHandler from "./handlers/searchPublicRoomHandler";
import joinRoomHanlder from "./handlers/joinRoomHandler";
import leaveRoomHandler from "./handlers/leaveRoomHandler";
import createAIRoomHandler from "./handlers/createAIRoomHandler";

export function roomManager(socket: Socket, io: Server) {
  createPrivateRoomHandler(socket, io);
  createAIRoomHandler(socket, io);
  searchPublicRoomHandler(socket, io);
  joinRoomHanlder(socket, io);
  leaveRoomHandler(socket, io);
}
