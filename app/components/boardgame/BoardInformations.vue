<script setup lang="ts">
import type { Socket } from "socket.io-client";

const roomType = requiredInject<Ref<RoomType>>("roomType");
const gameState = requiredInject<Ref<GameState>>("gameState");
const socket = requiredInject<Socket>("socket");

const turnRemainingTime = ref<number>(GameState.TURN_TIME_SECONDS);

socket.on("gameTurnRemainingTime", (fetchedTurnRemainingTime: number) => {
  turnRemainingTime.value = fetchedTurnRemainingTime;
});
</script>

<template>
  <section class="flex flex-col items-center z-10">
    <div class="flex space-x-5">
      <p class="small-title">Tour n° {{ gameState.turn }}</p>
      <p class="small-title">-</p>
      <p class="flex items-center space-x-2 text-xl">
        <span class="small-title">
          {{
            GameState.MAX_PAWNS_PER_PLAYER -
            gameState.determinePlayersLostPawns().player1sLostPawns.length +
            "/" +
            GameState.MAX_PAWNS_PER_PLAYER
          }}
        </span>
        <PawnDisplay
          size-class="size-5"
          color-class="bg-player1"
          orientation-class="rotate-0"
        />
        <span class="small-title">
          {{
            GameState.MAX_PAWNS_PER_PLAYER -
            gameState.determinePlayersLostPawns().player2sLostPawns.length +
            "/" +
            GameState.MAX_PAWNS_PER_PLAYER
          }}
        </span>
        <PawnDisplay
          size-class="size-5"
          color-class="bg-player2"
          orientation-class="rotate-0"
        />
      </p>
    </div>
    <p
      v-if="roomType !== RoomType.AI"
      class="small-title w-24 py-1 rounded-t-lg bg-dark-light remaning-time"
      :class="{ 'text-error': turnRemainingTime <= 10 }"
    >
      <i
        class="fa-solid fa-hourglass-half mr-2"
        :class="{ 'text-error': turnRemainingTime <= 10 }"
      />
      {{ turnRemainingTime }} s
    </p>
  </section>
</template>

<style scoped>
.remaning-time {
  margin-bottom: -20px;
}
</style>
