<script setup lang="ts">
import type { Socket } from "socket.io-client";

const socket = requiredInject<Socket>("socket");
const roomId = requiredInject<Ref<string>>("roomId");
const playerRole = requiredInject<Ref<PlayerRole>>("playerRole");

const props = defineProps<{
  targetPawn: Pawn;
  positionsAvailableForActions: PositionsAvailableForActions;
  rowIndex: number;
  colIndex: number;
}>();

const action = defineModel<Action | undefined>();
const emit = defineEmits(["rotatePawn", "unselectPawn"]);

const canMove = computed(() => {
  return (
    props.positionsAvailableForActions.positionsAvailableForMoving.length > 0
  );
});
const canKill = computed(() => {
  return (
    props.positionsAvailableForActions.positionsAvailableForKilling.length > 0
  );
});
const canPush = computed(() => {
  return (
    props.positionsAvailableForActions.positionsAvailableForPushing.length > 0
  );
});
const canPull = computed(() => {
  return (
    props.positionsAvailableForActions.positionsAvailableForPulling.length > 0
  );
});

const pawnColorClass = computed(() => {
  switch (playerRole.value) {
    case PlayerRole.Player1:
      return "bg-player1";
    case PlayerRole.Player2:
      return "bg-player2";
    default:
      return "";
  }
});

function rotatePawn(orientation: Orientation) {
  let orientationAccordingToBoardGameDirection: Orientation;
  if (playerRole.value === PlayerRole.Player2) {
    switch (orientation) {
      case Orientation.NW:
        orientationAccordingToBoardGameDirection = Orientation.SE;
        break;
      case Orientation.NE:
        orientationAccordingToBoardGameDirection = Orientation.SW;
        break;
      case Orientation.SE:
        orientationAccordingToBoardGameDirection = Orientation.NW;
        break;
      case Orientation.SW:
        orientationAccordingToBoardGameDirection = Orientation.NE;
        break;
    }
  } else {
    orientationAccordingToBoardGameDirection = orientation;
  }

  socket.emit(
    "rotatePawn",
    roomId.value,
    playerRole.value,
    props.targetPawn,
    orientationAccordingToBoardGameDirection,
    (response: SocketResponse) => {
      handleSocketResponse(response);
    }
  );

  emit("rotatePawn");
}
</script>

<template>
  <section
    v-if="
      targetPawn.position.row === rowIndex &&
      targetPawn.position.col === colIndex
    "
    class="absolute grid grid-cols-3 grid-rows-3 place-items-center size-36 md:size-60 sm:size-52 z-20"
    :class="boardGameOrientation(playerRole)"
  >
    <div
      class="bg-light size-10 sm:size-16 flex items-center justify-center rounded-full cursor-pointer hover:opacity-50"
      @click="rotatePawn(Orientation.NW)"
    >
      <PawnDisplay
        size-class="size-5 sm:size-8"
        :color-class="pawnColorClass"
        orientation-class="rotate-0"
      />
    </div>
    <div
      class="bg-light size-10 sm:size-16 flex items-center justify-center rounded-full cursor-pointer hover:opacity-50"
      :class="{
        'opacity-30': !canMove
      }"
      @click="action = Action.Move"
    >
      <MovePawnSvg
        :pawnfill-class="
          playerRole === PlayerRole.Player1 ? 'fill-player1' : 'fill-player2'
        "
        class="size-8 sm:size-10"
      />
    </div>
    <div
      class="bg-light size-10 sm:size-16 flex items-center justify-center rounded-full cursor-pointer hover:opacity-50"
      @click="rotatePawn(Orientation.NE)"
    >
      <PawnDisplay
        size-class="size-5 sm:size-8"
        :color-class="pawnColorClass"
        orientation-class="rotate-90"
      />
    </div>
    <div
      class="bg-light size-10 sm:size-16 flex items-center justify-center rounded-full cursor-pointer hover:opacity-50"
      :class="{
        'opacity-30': !canPush
      }"
      @click="action = Action.Push"
    >
      <PushPawnSvg
        :pawnfill-class="
          playerRole === PlayerRole.Player1 ? 'fill-player1' : 'fill-player2'
        "
        class="size-8 sm:size-10"
      />
    </div>
    <div class="size-full cursor-pointer" @click="emit('unselectPawn')" />
    <div
      class="bg-light size-10 sm:size-16 flex items-center justify-center rounded-full cursor-pointer hover:opacity-50"
      :class="{
        'opacity-30': !canPull
      }"
      @click="action = Action.Pull"
    >
      <PullPawnSvg
        :pawnfill-class="
          playerRole === PlayerRole.Player1 ? 'fill-player1' : 'fill-player2'
        "
        class="size-8 sm:size-10"
      />
    </div>
    <div
      class="bg-light size-10 sm:size-16 flex items-center justify-center rounded-full cursor-pointer hover:opacity-50"
      @click="rotatePawn(Orientation.SW)"
    >
      <PawnDisplay
        size-class="size-5 sm:size-8"
        :color-class="pawnColorClass"
        orientation-class="rotate-270"
      />
    </div>
    <div
      class="bg-light size-10 sm:size-16 flex items-center justify-center rounded-full cursor-pointer hover:opacity-50"
      :class="{
        'opacity-30': !canKill
      }"
      @click="action = Action.Kill"
    >
      <KillPawnSvg
        :pawnfill-class="
          playerRole === PlayerRole.Player1 ? 'fill-player1' : 'fill-player2'
        "
        class="size-8 sm:size-10"
      />
    </div>
    <div
      class="bg-light size-10 sm:size-16 flex items-center justify-center rounded-full cursor-pointer hover:opacity-50"
      @click="rotatePawn(Orientation.SE)"
    >
      <PawnDisplay
        size-class="size-5 sm:size-8"
        :color-class="pawnColorClass"
        orientation-class="rotate-180"
      />
    </div>
  </section>
</template>
