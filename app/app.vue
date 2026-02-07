<script setup lang="ts">
useHead({
  title: "Stratège - Jeu de Plateau en Ligne",
  meta: [
    {
      name: "description",
      content:
        "Jouez à Stratège en ligne ! Utilisez vos stratégies pour éliminer les pions adverses et remporter la victoire."
    }
  ]
});
</script>

<template>
  <HeaderComp />
  <NuxtPage />
  <InfosDisplayer />
  <ErrorsDisplayer />
  <CookieRequester />
</template>
