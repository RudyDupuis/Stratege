<script setup lang="ts">
import type AvatarFinder from "./AvatarFinder.vue";

const emit = defineEmits<{
  (e: "close"): void;
}>();

const { user } = useUserSession();

const avatarFinderComp =
  useTemplateRef<InstanceType<typeof AvatarFinder>>("avatarFinderComp");
const avatarIndices = computed(() =>
  Array.from(
    { length: avatarFinderComp.value?.avatars.length || 0 },
    (_, i) => i + 1
  )
);

async function updateUser() {
  if (isNull(user.value)) {
    return;
  }

  try {
    await $fetch(`/api/users/me`, {
      method: "PUT",
      body: JSON.stringify(userSchema.parse(user.value))
    });
  } catch {
    useErrorsStore().addError(
      "Une erreur est survenue lors de la mise à jour du profil."
    );
  }

  emit("close");
}
</script>

<template>
  <template v-if="isNotNull(user)">
    <section>
      <h2 class="medium-title mb-5">Edition du profil</h2>
      <section
        class="flex flex-col items-center bg-dark-light p-5 sm:p-10 rounded-xl shadow-lg mb-10"
      >
        <AvatarFinder
          ref="avatarFinderComp"
          :avatar-id="user.avatarId"
          class="w-40 h-40 mb-5"
        />

        <div class="flex justify-center gap-2">
          <button
            v-for="avatarId in avatarIndices"
            :key="avatarId"
            @click="user.avatarId = avatarId"
          >
            <AvatarFinder
              :avatar-id="avatarId"
              class="w-10 h-10"
              :class="user.avatarId === avatarId ? 'opacity-100' : 'opacity-50'"
            />
          </button>
        </div>
      </section>
      <div class="flex flex-col mb-10">
        <label for="pseudo" class="font-primary-bold mb-2">
          Nouveau Pseudo
        </label>
        <input
          id="pseudo"
          v-model="user.pseudo"
          type="text"
          class="input mb-1"
          maxlength="20"
        />
        <p
          v-if="user.pseudo.length < 3 || user.pseudo.length > 20"
          class="text-error"
        >
          Le pseudo doit contenir entre 3 et 20 caractères.
        </p>
        <p>
          Attention : Un pseudo injurieux ou inapproprié peut
          <br />
          entraîner un risque de bannissement.
        </p>
      </div>
    </section>

    <button
      v-button-click-sound
      :disabled="user.pseudo.length < 3 || user.pseudo.length > 20"
      class="button mb-2"
      @click="updateUser"
    >
      <i class="fa-solid fa-floppy-disk mr-2" />
      Enregister
    </button>
    <button
      v-button-click-sound
      class="danger-button mb-10"
      @click="emit('close')"
    >
      Annuler
    </button>
  </template>
  <template v-else>
    <p>Votre profil n'a pas pu être chargé. Veuillez réessayer plus tard.</p>
  </template>
</template>
