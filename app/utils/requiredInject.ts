/**
 * Use only if T is not undefined or hasn't an undefined value
 */
export function requiredInject<T>(key: string): T {
  const injected = inject<T>(key);
  if (isUndefined(injected)) {
    throw useErrorsStore().addError(
      `Injection manquante pour la clé : "${key}"`
    );
  }
  return injected;
}
