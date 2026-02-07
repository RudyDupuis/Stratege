import type { Server, Socket } from "socket.io";
import { rooms } from "../record/roomRecords";
import emitPlayersInfo from "../../utils/room/emitPlayersInfo";
import type { Callback } from "../../utils/types";

export default function createAIRoomHandler(socket: Socket, io: Server) {
  socket.on("createAiRoom", (aiLevel: AiLevel, callback: Callback) => {
    const roomId = socket.id;
    rooms[roomId] = {
      type: RoomType.AI,
      playersInfo: [
        {
          socketId: socket.id,
          role: PlayerRole.Player1,
          isConnected: false
        },
        {
          role: PlayerRole.Player2,
          isConnected: true
        }
      ],
      aiLevel
    };

    callback(roomId);
    emitPlayersInfo(io, rooms, roomId);
  });
}
