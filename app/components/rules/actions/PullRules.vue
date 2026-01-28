<template>
  <section>
    <h3 class="small-title mb-5">Tirer</h3>
    <p class="mb-1">
      Si un pion est
      <strong>adjacent à un pion allier ou adverse</strong>
      , il peut le tirer.
    </p>
    <p class="mb-1">
      Pour tirer un pion,
      <strong>une case libre avant le pion est obligatoire</strong>
      .
    </p>
    <p class="mb-5">
      Le nombre de déplacement restant du pion va diminuer de 1.
    </p>
    <div class="flex flex-col items-center justify-center">
      <BoardGameDrawing size-class="w-48 h-10" :rows="1" :cols="5" class="mb-5">
        <template #0-1>
          <div class="size-full bg-pulling" />
        </template>
        <template #0-2>
          <PawnDisplay
            size-class="size-11/12"
            color-class="bg-light"
            orientation-class="rotate-0"
          >
            <p class="text-light font-primary-bold absolute top-0 left-0 px-1">
              {{ GameState.MAX_PAWN_MOVEMENT }}
            </p>
          </PawnDisplay>
        </template>
        <template #0-3>
          <PawnDisplay
            size-class="size-11/12"
            color-class="bg-player1"
            orientation-class="rotate-0"
          />
        </template>
      </BoardGameDrawing>
      <BoardGameDrawing size-class="w-48 h-10" :rows="1" :cols="5">
        <template #0-1>
          <PawnDisplay
            size-class="size-11/12"
            color-class="bg-light"
            orientation-class="rotate-0"
          >
            <p class="text-light font-primary-bold absolute top-0 left-0 px-1">
              {{ GameState.MAX_PAWN_MOVEMENT - 1 }}
            </p>
          </PawnDisplay>
        </template>
        <template #0-2>
          <PawnDisplay
            size-class="size-11/12"
            color-class="bg-player1"
            orientation-class="rotate-0"
          />
        </template>
      </BoardGameDrawing>
    </div>
  </section>
</template>
