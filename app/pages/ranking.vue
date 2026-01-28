<script setup lang="ts">
import type { User } from "~~/prisma/generated/client";

const users = ref<User[]>([]);
const { user: currentUser } = useUserSession();
const isLoading = ref(true);

try {
  users.value = await $fetch<User[]>("/api/users/top100");
} catch {
  useErrorsStore().addError(
    "Une erreur est survenue lors du chargement du classement."
  );
} finally {
  isLoading.value = false;
}
</script>

<template>
  <main>
    <h1 class="large-title mb-5 my-32">Classement</h1>
    <h2 class="medium-title mb-10">Les 100 meilleurs joueurs</h2>
    <Loading v-if="isLoading" class="w-10 h-10" />
    <template v-else>
      <section class="bg-dark-light p-5 rounded-xl shadow-lg mb-10">
        <table class="table-auto border-collapse">
          <thead>
            <tr>
              <th class="py-2 px-4 text-left">Position</th>
              <th class="py-2 px-4 text-left hidden sm:table-cell">Avatar</th>
              <th class="py-2 px-4 text-left">Pseudo</th>
              <th class="py-2 px-4 text-left">Score</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in users" :key="index" class="border-b">
              <td
                class="py-2 px-4"
                :class="{
                  'font-primary-bold':
                    user.keycloakId === currentUser?.keycloakId
                }"
              >
                {{ index + 1 }}
              </td>
              <td class="py-2 px-4 hidden sm:table-cell">
                <AvatarFinder :avatar-id="user.avatarId" class="w-8 h-8" />
              </td>
              <td
                class="py-2 px-4 max-w-36 sm:max-w-full truncate"
                :class="{
                  'font-primary-bold':
                    user.keycloakId === currentUser?.keycloakId
                }"
              >
                {{ user.pseudo }}
              </td>
              <td
                class="py-2 px-4"
                :class="{
                  'font-primary-bold':
                    user.keycloakId === currentUser?.keycloakId
                }"
              >
                {{ user.eloScore }}
              </td>
            </tr>
          </tbody>
        </table>
      </section>
      <RouterLink
        v-button-click-sound
        :to="{ name: 'play' }"
        class="button mb-5"
      >
        <i class="fa-solid fa-gamepad mr-2" />
        Jouer !
      </RouterLink>
    </template>
  </main>
</template>
