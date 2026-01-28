export const useErrorsStore = defineStore("errors", () => {
  const errors = ref<string[]>([]);

  function addError(error: string) {
    errors.value.push(error);
  }

  function removeError(error: string) {
    errors.value = errors.value.filter(
      (currentError) => currentError !== error
    );
  }

  return { errors, addError, removeError };
});
