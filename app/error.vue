<script setup lang="ts">
import type { NuxtError } from "#app";

defineProps<{
  error: NuxtError;
}>();
</script>

<template>
  <HeaderComp />
  <main>
    <div class="flex flex-col items-center justify-center space-y-5 mb-10">
      <h1 class="large-title">Page introuvable</h1>
      <p>Désolé cette page n'existe pas ...</p>
    </div>
    <RouterLink to="/" class="button">Revenir à l'acceuil ?</RouterLink>
  </main>
</template>
