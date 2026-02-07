export interface Room {
  type: RoomType;
  playersInfo: PlayerInfo[];
  aiLevel?: AiLevel;
}

export const rooms: Record<string, Room> = {};

export function deleteRoom(roomId: string) {
  // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
  delete rooms[roomId];
}
