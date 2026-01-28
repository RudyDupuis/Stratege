export const useInfosStore = defineStore("infos", () => {
  const infos = ref<string[]>([]);

  function addInfo(info: string) {
    infos.value.push(info);
  }

  function removeInfo(info: string) {
    infos.value = infos.value.filter((currentInfo) => currentInfo !== info);
  }

  return { infos, addInfo, removeInfo };
});
