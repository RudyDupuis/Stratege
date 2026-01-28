<template>
  <section>
    <h2 class="medium-title mb-5">But du jeu</h2>
    <p class="mb-1">
      <strong>Le but du jeu est de prendre les 8 pions adverses</strong>
      .
    </p>
    <p class="mb-1">
      Pour prendre un pion adverse, il suffit de
      <strong>se déplacer sur la case du pion</strong>
      .
    </p>
    <p class="mb-1">
      Un pion est
      <strong>protégé par un bouclier</strong>
      représenté par le triangle noir.
    </p>
    <p class="mb-5">
      Il n'est pas possible de prendre un pion du coté de son bouclier.
    </p>
    <div class="flex justify-center mb-5">
      <BoardGameDrawing size-class="size-48" :rows="3" :cols="3">
        <template #1-1>
          <PawnDisplay
            size-class="size-11/12"
            color-class="bg-light"
            orientation-class="rotate-0"
          >
            <i class="fa-solid fa-shield-halved px-2 text-light" />
          </PawnDisplay>
        </template>
        <template #0-1>
          <i class="fa-solid fa-arrow-down text-error text-3xl" />
        </template>
        <template #1-0>
          <i class="fa-solid fa-arrow-right text-error text-3xl" />
        </template>
        <template #2-1>
          <i class="fa-solid fa-arrow-up text-success text-3xl" />
        </template>
        <template #1-2>
          <i class="fa-solid fa-arrow-left text-success text-3xl" />
        </template>
      </BoardGameDrawing>
    </div>
    <p class="mb-1">
      <strong>La partie se termine lorsqu'un joueur n'a plus de pion</strong>
      . Il aura perdu.
    </p>
  </section>
</template>
