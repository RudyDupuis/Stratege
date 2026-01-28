<template>
  <section>
    <h2 class="medium-title mb-5">Le matériel</h2>
    <ul class="flex flex-col items-center space-y-5">
      <li class="flex flex-col items-center space-y-2">
        <p>Un plateau de 8x8 cases</p>
        <BoardGameDrawing
          size-class="size-32"
          border-padding-class="p-2"
          :rows="8"
          :cols="8"
        />
      </li>
      <li class="flex flex-col items-center space-y-2">
        <p>8 pions pour le joueur 1</p>
        <div class="flex space-x-1">
          <PawnDisplay
            v-for="index in 8"
            :key="index"
            size-class="size-8"
            color-class="bg-player1"
            orientation-class="rotate-0"
          />
        </div>
      </li>
      <li class="flex flex-col items-center space-y-2">
        <p>8 pions pour le joueur 2</p>
        <div class="flex space-x-1">
          <PawnDisplay
            v-for="index in 8"
            :key="index"
            size-class="size-8"
            color-class="bg-player2"
            orientation-class="rotate-0"
          />
        </div>
      </li>
    </ul>
  </section>
</template>
