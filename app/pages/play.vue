<script setup lang="ts">
import { io } from "socket.io-client";

const { user } = useUserSession();

const socket = io();
provide("socket", socket);

const route = useRoute();
const router = useRouter();

const roomId = ref<string | undefined>(
  route.query.roomId as string | undefined
);
provide("roomId", roomId);

const roomType = ref<RoomType | undefined>(undefined);
provide("roomType", roomType);

const aiLevel = ref<AiLevel | undefined>(undefined);
provide("aiLevel", aiLevel);

function getRoomIdAndChangeURL(id: string) {
  roomId.value = id;
  router.push({ path: "/play", query: { roomId: id } });
}

watch([roomType, aiLevel], () => {
  if (roomType.value === RoomType.Private) {
    socket.emit("createPrivateRoom", (id: string) => {
      getRoomIdAndChangeURL(id);
    });
  }
  if (roomType.value === RoomType.Public) {
    if (isNull(user.value)) {
      useErrorsStore().addError(
        "Vous devez vous connecter pour jouer en partie classée"
      );
      return;
    }
    socket.emit("searchPublicRoom", user.value.keycloakId, (id: string) => {
      getRoomIdAndChangeURL(id);
    });
  }
  if (roomType.value === RoomType.AI && isDefined(aiLevel.value)) {
    socket.emit("createAiRoom", aiLevel.value, (id: string) => {
      getRoomIdAndChangeURL(id);
    });
  }
});
</script>

<template>
  <main>
    <PlayingRoom v-if="isDefined(roomId)" :user-id="user?.keycloakId" />
    <RoomTypeSelector
      v-else
      v-model:room-type="roomType"
      v-model:ai-level="aiLevel"
    />
  </main>
</template>
