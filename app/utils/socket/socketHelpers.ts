export interface SocketResponse {
  error?: string;
}

export function handleSocketResponse(response: SocketResponse) {
  if (response.error) {
    useErrorsStore().addError(response.error.toString());
  }
}
