<script setup lang="ts">
const roomType = requiredInject<Ref<RoomType>>("roomType");
const roomId = requiredInject<Ref<string | undefined>>("roomId");

const baseUrl = computed(() =>
  import.meta.client
    ? `${window.location.protocol}//${window.location.host}`
    : ""
);
const shareableLink = `${baseUrl.value}/play?roomId=${roomId.value}`;
const copyStatus = ref<string | undefined>(undefined);

async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    copyStatus.value = "Lien copié !";
    setTimeout(() => {
      copyStatus.value = undefined;
    }, 2000);
  } catch {
    useErrorsStore().addError(
      "Une erreur est survenue lors de la copie du lien"
    );
  }
}
</script>

<template>
  <div class="flex flex-col items-center">
    <p class="medium-title mb-10">En attente de vote adversaire</p>
    <div class="flex space-x-5 mb-20">
      <div class="w-3 h-3 bg-dark rounded-full animate-bounce" />
      <div class="w-3 h-3 bg-dark rounded-full animate-bounce-delay-02" />
      <div class="w-3 h-3 bg-dark rounded-full animate-bounce-delay-04" />
    </div>
    <button
      v-if="roomType === RoomType.Private"
      v-button-click-sound
      class="button mb-5"
      @click="copyToClipboard(shareableLink)"
    >
      <i class="fa-solid fa-copy mr-2" />
      {{
        isUndefined(copyStatus)
          ? "Copier le lien à donner à son ami"
          : copyStatus
      }}
    </button>
    <RouterLink v-button-click-sound to="/" class="danger-button">
      <i class="fa-solid fa-home mr-2" />
      Retourner au menu
    </RouterLink>
  </div>
</template>

<style>
@keyframes bounce {
  0% {
    transform: translateY(-5px);
  }
  50% {
    transform: translateY(5px);
  }
  100% {
    transform: translateY(-5px);
  }
}

.animate-bounce {
  animation: bounce 1s infinite;
}
.animate-bounce-delay-02 {
  animation: bounce 1s infinite 0.2s;
}
.animate-bounce-delay-04 {
  animation: bounce 1s infinite 0.4s;
}
</style>
