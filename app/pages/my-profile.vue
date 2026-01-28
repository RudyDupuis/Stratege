<script setup lang="ts">
const { user, clear, loggedIn } = useUserSession();
const isEditing = ref(false);

function logout() {
  clear();
  navigateTo("/");
}
</script>

<template>
  <main>
    <h1 class="large-title mb-16 my-32">Mon profil</h1>
    <template v-if="isNotNull(user) && loggedIn">
      <template v-if="!isEditing">
        <section
          v-if="!isEditing"
          class="flex flex-col items-center bg-dark-light p-10 rounded-xl shadow-lg mb-10"
        >
          <AvatarFinder :avatar-id="user.avatarId" class="w-40 h-40 mb-3" />
          <h2 class="medium-title mb-5">{{ user.pseudo }}</h2>
          <p class="font-primary-bold">Score ELO : {{ user.eloScore }}</p>
        </section>

        <button
          v-button-click-sound
          class="button mb-2"
          @click="isEditing = true"
        >
          <i class="fa-solid fa-pen-to-square mr-2" />
          Modifier mon profil
        </button>
        <button
          v-button-click-sound
          class="danger-button mb-10"
          @click="logout()"
        >
          <i class="fa-solid fa-power-off mr-2" />
          Se déconnecter
        </button>
      </template>

      <ProfileUpdate v-else @close="isEditing = false" />
    </template>

    <template v-else>
      <p>Vous devez vous connecter pour voir votre profil.</p>
    </template>
  </main>
</template>
