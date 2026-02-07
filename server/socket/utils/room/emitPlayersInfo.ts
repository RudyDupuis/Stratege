import type { Room } from "../../room/record/roomRecords";
import type { Server } from "socket.io";

export default function emitPlayersInfo(
  io: Server,
  rooms: Record<string, Room>,
  roomId: string
) {
  if (rooms[roomId]) {
    io.to(roomId).emit(
      "playersInfo",
      rooms[roomId].playersInfo.map((playerInfo) => playerInfoToDto(playerInfo))
    );
  }
}
