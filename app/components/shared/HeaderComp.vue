<script setup lang="ts">
const route = useRoute();
const soundStore = useSoundStore();
const isMuted = storeToRefs(soundStore).isMuted;

const isInGame = computed(() => {
  return route.path.startsWith("/jouer") && route.query.roomId !== undefined;
});

onMounted(() => {
  soundStore.setupSoundAndMuteState();
});
</script>
<template>
  <header
    v-if="!isInGame"
    class="z-30 p-5 fixed top-0 left-0 flex items-center justify-between w-full bg-light"
  >
    <RouterLink to="/" class="small-title">Stratège</RouterLink>
    <UserLogin />
  </header>
  <button
    class="fixed cursor-pointer z-30 right-0 bg-dark-light p-2 rounded-l-xl hover:opacity-50"
    :class="{ 'top-5': isInGame, 'top-20': !isInGame }"
    @click="soundStore.toggleMuteSwitch()"
  >
    <i v-if="!isMuted" class="fa-solid fa-volume-high" />
    <i v-if="isMuted" class="fa-solid fa-volume-xmark" />
  </button>
</template>
