export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.directive("button-click-sound", {
    mounted(el) {
      el.addEventListener("click", () => {
        useSoundStore().playSound("button_click");
      });
    }
  });
});
