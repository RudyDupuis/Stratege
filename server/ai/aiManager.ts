import type { Server } from "socket.io";
import type { Callback } from "../socket/utils/types";
import playAMoveRecursively from "./playAMoveRecursively";

export default function aiManager(
  roomId: string,
  io: Server,
  callback: Callback
) {
  setTimeout(() => playAMoveRecursively(roomId, io, callback), 1000);
}
