<template>
  <section>
    <h3 class="small-title mb-5">Se déplacer</h3>
    <p class="mb-5">
      Chaque pion peut avancer de
      <strong>0, 1 ou 2 cases selon le choix du joueur</strong>
      .
    </p>
    <div class="flex justify-center">
      <BoardGameDrawing size-class="size-48" :rows="5" :cols="5">
        <template #2-2>
          <PawnDisplay
            size-class="size-11/12"
            color-class="bg-light"
            orientation-class="rotate-0"
          />
        </template>
        <template #0-2>
          <div class="size-full bg-moving" />
        </template>
        <template #1-1>
          <div class="size-full bg-moving" />
        </template>
        <template #1-2>
          <div class="size-full bg-moving" />
        </template>
        <template #1-3>
          <div class="size-full bg-moving" />
        </template>
        <template #2-0>
          <div class="size-full bg-moving" />
        </template>
        <template #2-1>
          <div class="size-full bg-moving" />
        </template>
        <template #2-3>
          <div class="size-full bg-moving" />
        </template>
        <template #2-4>
          <div class="size-full bg-moving" />
        </template>
        <template #3-1>
          <div class="size-full bg-moving" />
        </template>
        <template #3-2>
          <div class="size-full bg-moving" />
        </template>
        <template #3-3>
          <div class="size-full bg-moving" />
        </template>
        <template #4-2>
          <div class="size-full bg-moving" />
        </template>
      </BoardGameDrawing>
    </div>
  </section>
</template>
