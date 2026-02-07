import type { Server, Socket } from "socket.io";
import { deleteRoom, rooms } from "../record/roomRecords";
import {
  deleteGameGiveUpTimer,
  setGameGiveUpTimer
} from "../../game/record/gameGiveUpTimerRecord";
import emitPlayersInfo from "../../utils/room/emitPlayersInfo";
import { deleteGame } from "../../game/record/gameRecords";
import { deleteGameTurnTimer } from "../../game/record/gameTurnTimerRecords";

function leaveRoom(roomId: string, socket: Socket, io: Server) {
  if (isUndefined(rooms[roomId])) {
    return;
  }

  const playerIndex = rooms[roomId].playersInfo.findIndex(
    (player) => player.socketId === socket.id
  );

  if (playerIndex !== -1) {
    rooms[roomId].playersInfo[playerIndex].isConnected = false;
    setGameGiveUpTimer(roomId, rooms[roomId].playersInfo[playerIndex].role, io);
    emitPlayersInfo(io, rooms, roomId);
  }

  if (
    !rooms[roomId].playersInfo.find((player) => player.isConnected === true) ||
    rooms[roomId].type === RoomType.AI
  ) {
    deleteRoom(roomId);
    deleteGame(roomId);
    deleteGameTurnTimer(roomId);
    deleteGameGiveUpTimer(roomId);
  }
}

export default function leaveRoomHandler(socket: Socket, io: Server) {
  socket.on("disconnect", () => {
    for (const roomId in rooms) {
      if (isUndefined(rooms[roomId])) {
        continue;
      }
      const playerIndex = rooms[roomId].playersInfo.findIndex(
        (player) => player.socketId === socket.id
      );

      if (playerIndex !== -1) {
        leaveRoom(roomId, socket, io);
        break;
      }
    }
  });
  socket.on("leaveRoom", (roomId: string) => leaveRoom(roomId, socket, io));
}
