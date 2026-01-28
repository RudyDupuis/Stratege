<template>
  <section class="mb-16">
    <h3 class="small-title mb-5">Orienter</h3>
    <p class="mb-5">
      Chaque pion peut être
      <strong>orienté plusieurs fois</strong>
      pendant le tour de jeu.
    </p>
    <div class="flex space-x-8 justify-center items-center">
      <PawnDisplay
        size-class="size-10"
        color-class="bg-dark-light"
        orientation-class="rotate-0"
      />
      <PawnDisplay
        size-class="size-10"
        color-class="bg-dark-light"
        orientation-class="rotate-90"
      />
      <PawnDisplay
        size-class="size-10"
        color-class="bg-dark-light"
        orientation-class="rotate-270"
      />
      <PawnDisplay
        size-class="size-10"
        color-class="bg-dark-light"
        orientation-class="rotate-180"
      />
    </div>
  </section>
</template>
