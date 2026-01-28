<script setup lang="ts">
const errors = storeToRefs(useErrorsStore()).errors;
</script>

<template>
  <div
    v-for="(error, index) in errors"
    :key="index"
    class="font-primary-bold fixed bottom-4 bg-error p-4 rounded shadow-lg mx-6 z-50"
  >
    {{ error }}
    <button
      class="ml-4 underline cursor-pointer"
      @click="useErrorsStore().removeError(error)"
    >
      Fermer
    </button>
  </div>
</template>
