<script setup lang="ts">
import type { Socket } from "socket.io-client";

const socket = requiredInject<Socket>("socket");
const roomId = requiredInject<Ref<string>>("roomId");
const playerRole = requiredInject<Ref<PlayerRole>>("playerRole");

const props = defineProps<{
  targetPawn: Pawn;
  action: Action;
  positionsAvailableForActions: PositionsAvailableForActions;
  rowIndex: number;
  colIndex: number;
}>();

const emit = defineEmits(["doAction"]);

function pawnAction(desiredPawnPosition: PawnPosition) {
  socket.emit(
    `${props.action}Pawn`,
    roomId.value,
    playerRole.value,
    props.targetPawn,
    desiredPawnPosition,
    (response: SocketResponse) => {
      handleSocketResponse(response);
    }
  );

  emit("doAction");
}

const cellColor = computed(() => {
  switch (props.action) {
    case Action.Move:
      return "bg-moving";
    case Action.Kill:
      return "bg-killing";
    case Action.Push:
      return "bg-pushing";
    case Action.Pull:
      return "bg-pulling";
    default:
      return "";
  }
});

const positionsAvailableForAction = computed(() => {
  switch (props.action) {
    case Action.Move:
      return props.positionsAvailableForActions.positionsAvailableForMoving;
    case Action.Kill:
      return props.positionsAvailableForActions.positionsAvailableForKilling;
    case Action.Push:
      return props.positionsAvailableForActions.positionsAvailableForPushing;
    case Action.Pull:
      return props.positionsAvailableForActions.positionsAvailableForPulling;
    default:
      return [];
  }
});
</script>

<template>
  <div
    v-if="
      positionsAvailableForAction.some(
        (pawnPosition) =>
          pawnPosition.row === rowIndex && pawnPosition.col === colIndex
      )
    "
    :class="`${cellColor} size-full ${action === 'kill' ? 'absolute inset-0 z-10 opacity-40' : ''} cursor-pointer`"
    @click="pawnAction(new PawnPosition(rowIndex, colIndex))"
  />
</template>
