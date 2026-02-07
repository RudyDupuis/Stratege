<script setup lang="ts">
const roomType = defineModel<RoomType | undefined>("roomType");
const aiLevel = defineModel<AiLevel | undefined>("aiLevel");
const { user } = useUserSession();
</script>

<template>
  <template v-if="roomType !== RoomType.AI">
    <h1 class="large-title mb-14">Quel type de partie ?</h1>

    <button
      v-button-click-sound
      :disabled="isNull(user)"
      class="button"
      @click="roomType = RoomType.Public"
    >
      <i class="fa-solid fa-trophy mr-2" />
      Partie classée
    </button>
    <p v-if="isNull(user)">
      Pour jouer en partie classée, vous devez vous connecter.
    </p>

    <button
      v-button-click-sound
      class="button mt-5"
      @click="roomType = RoomType.Private"
    >
      <i class="fa-solid fa-user-group mr-2" />
      Jouer avec un ami
    </button>

    <button
      v-button-click-sound
      class="button mt-5"
      @click="roomType = RoomType.AI"
    >
      <i class="fa-solid fa-robot mr-2" />
      Affronter une IA
    </button>
  </template>
  <template v-else>
    <h1 class="large-title mb-14">Quel niveau d'IA ?</h1>

    <button v-button-click-sound class="button" @click="aiLevel = AiLevel.Easy">
      <i class="fa-solid fa-seedling mr-2" />
      Facile
    </button>

    <button
      v-button-click-sound
      class="button mt-5"
      disabled
      @click="aiLevel = AiLevel.Medium"
    >
      <i class="fa-solid fa-dumbbell mr-2" />
      Moyen
    </button>
    <p>L'IA est encore en entrainement et n'a pas atteint le niveau moyen.</p>

    <button
      v-button-click-sound
      class="button mt-5"
      disabled
      @click="aiLevel = AiLevel.Hard"
    >
      <i class="fa-solid fa-skull mr-2" />
      Difficile
    </button>
    <p>
      L'IA est encore en entrainement et n'a pas atteint le niveau difficile.
    </p>
  </template>
</template>
