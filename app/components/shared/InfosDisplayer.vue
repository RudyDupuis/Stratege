<script setup lang="ts">
const infos = storeToRefs(useInfosStore()).infos;
</script>

<template>
  <div
    v-for="(info, index) in infos"
    :key="index"
    class="font-primary-bold fixed bottom-4 bg-info p-4 rounded shadow-lg mx-6 z-50"
  >
    {{ info }}
    <button
      class="ml-4 underline cursor-pointer"
      @click="useInfosStore().removeInfo(info)"
    >
      Fermer
    </button>
  </div>
</template>
