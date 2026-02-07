<script setup lang="ts">
import type {
  EndGameInformationDto,
  GameStateDto,
  PlayerInfoDto
} from "#imports";
import type { Socket } from "socket.io-client";
import type { User } from "~~/prisma/generated/client";
import gameStateDtoToEntity from "~~/utils/gameLogic/gameState/mappers/gameStateMapper";

const props = defineProps<{
  userId?: User["keycloakId"];
}>();

const roomId = requiredInject<Ref<string | undefined>>("roomId");
const socket = requiredInject<Socket>("socket");

const gameState = ref<GameState | undefined>(undefined);
socket.on("gameState", (state: GameStateDto) => {
  gameState.value = gameStateDtoToEntity(state);
});
provide("gameState", gameState);

const playersInfo = ref<PlayerInfo[]>([]);
socket.on("playersInfo", (playersInfoDto: PlayerInfoDto[]) => {
  playersInfo.value = playersInfoDto.map((playerInfoDto) =>
    playerInfoDtoToEntity(playerInfoDto)
  );
});
provide("playersInfo", playersInfo);

const playerRole = ref<PlayerRole | undefined>(undefined);
provide("playerRole", playerRole);

const endGameInformation = ref<EndGameInformation | undefined>(undefined);
socket.on(
  "endGameInformation",
  (endGameInformationDto: EndGameInformationDto) => {
    endGameInformation.value = endGameInformationDtoToEntity(
      endGameInformationDto
    );
  }
);
provide("endGameInformation", endGameInformation);

watch(
  () => props.userId,
  () => {
    socket.emit(
      "joinRoom",
      roomId.value,
      props.userId,
      (response: { playerRole?: PlayerRole; error?: unknown }) => {
        if (response?.playerRole) {
          playerRole.value = response.playerRole;
        }
        if (response?.error) {
          useErrorsStore().addError(response.error.toString());
        }
      }
    );
  },
  { immediate: true }
);

onUnmounted(() => {
  socket.emit("leaveRoom", roomId.value);
});
</script>

<template>
  <BoardGameHandler v-if="isDefined(gameState) && isDefined(playerRole)" />
  <WaitingOpponent v-else />
</template>
