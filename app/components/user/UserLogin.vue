<script setup lang="ts">
const { user, fetch, loggedIn } = useUserSession();

const route = useRoute();
const { replace } = useRouter();
const errorsStore = useErrorsStore();

if (route.query.authError) {
  errorsStore.addError("Échec de la connexion. Veuillez réessayer.");
  replace({ query: { ...route.query, authError: undefined } });
}

onMounted(() => {
  fetch();
});
</script>

<template>
  <a v-if="!loggedIn || isNull(user)" href="/api/auth/keycloak">
    <span class="mr-2">Connexion</span>
    <i class="fa-solid fa-right-to-bracket" />
  </a>
  <RouterLink
    v-else
    class="flex items-center space-x-2 bg-dark-light px-3 py-2 rounded-xl cursor-pointer hover:opacity-80"
    to="/my-profile"
  >
    <AvatarFinder :avatar-id="user.avatarId" class="w-6 h-6" />
    <p class="font-primary-bold">{{ user.pseudo }}</p>
  </RouterLink>
</template>
