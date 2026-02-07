<script setup lang="ts">
import type { Socket } from "socket.io-client";
import type { User } from "~~/prisma/generated/client";

const socket = requiredInject<Socket>("socket");
const roomId = requiredInject<Ref<string>>("roomId");
const playerRole = requiredInject<Ref<PlayerRole>>("playerRole");
const isPlayerTurn = requiredInject<Ref<boolean>>("isPlayerTurn");
const playersInfo = requiredInject<Ref<PlayerInfo[]>>("playersInfo");
const endGameInformation =
  requiredInject<Ref<EndGameInformation | undefined>>("endGameInformation");

const emit = defineEmits(["passTurn"]);

const usersLinkedToConnectedPlayers = ref<Record<string, User>>({});
const usersLinkedToConnectedPlayersIsLoading = ref<boolean>(false);

playersInfo.value.forEach(async (player) => {
  if (isUndefined(player.userId)) {
    return;
  }

  usersLinkedToConnectedPlayersIsLoading.value = true;

  try {
    const fetchedUsers = await $fetch<User>(`/api/users/${player.userId}`);
    if (isUndefined(player.userId)) {
      return;
    }
    usersLinkedToConnectedPlayers.value[player.userId] = fetchedUsers;
  } catch {
    useErrorsStore().addError(
      "Erreur lors de la récupération d'un utilisateur"
    );
  } finally {
    usersLinkedToConnectedPlayersIsLoading.value = false;
  }
});

function passTurn() {
  if (!isPlayerTurn.value) {
    return;
  }

  socket.emit(
    "passTurn",
    roomId.value,
    playerRole.value,
    (response: SocketResponse) => {
      handleSocketResponse(response);
    }
  );

  emit("passTurn");
}
</script>

<template>
  <div class="flex flex-col justify-center items-center size-full">
    <GameInformations
      v-if="!endGameInformation"
      :users-linked-to-connected-players="usersLinkedToConnectedPlayers"
      :users-linked-to-connected-players-is-loading="
        usersLinkedToConnectedPlayersIsLoading
      "
      @pass-turn="passTurn()"
      @give-up="socket.emit('giveUp', roomId, playerRole)"
    />
    <EndGameInformations
      v-else
      :users-linked-to-connected-players="usersLinkedToConnectedPlayers"
    />
  </div>
</template>
