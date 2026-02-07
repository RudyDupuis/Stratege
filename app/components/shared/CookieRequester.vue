<script setup lang="ts">
const { initialize } = useGtag();

const hasConsent = ref<boolean>(false);
const askForConsent = ref<boolean>(false);

function enableAnalytics() {
  if (!hasConsent.value) return;
  initialize();
}

const acceptCookies = () => {
  localStorage.setItem("cookieConsent", "accepted");
  enableAnalytics();
  askForConsent.value = false;
};

const refuseCookies = () => {
  localStorage.setItem("cookieConsent", "refused");
  askForConsent.value = false;
};

onMounted(() => {
  askForConsent.value = isNull(localStorage.getItem("cookieConsent"));
  if (!askForConsent.value) {
    hasConsent.value = localStorage.getItem("cookieConsent") === "accepted";
  }
  enableAnalytics();
});
</script>

<template>
  <div
    v-if="askForConsent"
    class="font-primary-bold fixed bottom-4 right-4 bg-info p-4 rounded shadow-lg mx-6"
  >
    Des cookies sont utilisés par Google Analitycs pour mesurer le trafic.
    <button class="ml-4 underline" @click="acceptCookies">Accepter</button>
    <button class="ml-4 underline" @click="refuseCookies">Refuser</button>
  </div>
</template>
