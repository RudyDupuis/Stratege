import type { Server, Socket } from "socket.io";
import { rooms } from "../record/roomRecords";
import emitPlayersInfo from "../../utils/room/emitPlayersInfo";
import type { User } from "~~/prisma/generated/client";
import type { Callback } from "../../utils/types";

export default function searchPublicRoomHandler(socket: Socket, io: Server) {
  socket.on(
    "searchPublicRoom",
    (userId: User["keycloakId"], callback: Callback) => {
      const availableRoomId = Object.entries(rooms).find(
        ([_, room]) =>
          room.type === RoomType.Public && room.playersInfo.length === 1
      )?.[0];

      let roomId: string;

      if (isUndefined(availableRoomId)) {
        roomId = socket.id;
        rooms[roomId] = {
          type: RoomType.Public,
          playersInfo: [
            {
              userId: userId,
              socketId: socket.id,
              role: PlayerRole.Player1,
              isConnected: false
            }
          ]
        };
      } else {
        roomId = availableRoomId;
        if (isDefined(rooms[roomId])) {
          rooms[roomId]!.playersInfo.push({
            userId: userId,
            socketId: socket.id,
            role: PlayerRole.Player2,
            isConnected: false
          });
        }
      }

      socket.join(roomId);
      callback(roomId);
      emitPlayersInfo(io, rooms, roomId);
    }
  );
}
