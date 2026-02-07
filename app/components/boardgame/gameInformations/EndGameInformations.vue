<script setup lang="ts">
import type { User } from "~~/prisma/generated/client";

const playerRole = requiredInject<Ref<PlayerRole>>("playerRole");
const endGameInformation =
  requiredInject<Ref<EndGameInformation>>("endGameInformation");

defineProps<{
  usersLinkedToConnectedPlayers: Record<string, User>;
}>();

if (endGameInformation.value.winner.playerRole === playerRole.value) {
  useSoundStore().playSound("win");
} else {
  useSoundStore().playSound("lose");
}
</script>

<template>
  <section class="flex flex-col justify-center items-center size-full">
    <p class="medium-title mb-10">
      {{
        endGameInformation.winner.playerRole === playerRole
          ? "Vous avez gagné !"
          : "Vous avez perdu ..."
      }}
    </p>

    <section
      v-if="
        isDefined(endGameInformation.winner.user) &&
        isDefined(endGameInformation.loser.user) &&
        isDefined(
          usersLinkedToConnectedPlayers[
            endGameInformation.winner.user.keycloakId
          ]
        ) &&
        isDefined(
          usersLinkedToConnectedPlayers[
            endGameInformation.loser.user.keycloakId
          ]
        )
      "
      class="flex justify-center space-x-5 md:space-x-10 mb-10"
    >
      <div class="flex flex-col items-center">
        <p class="texte-center text-3xl font-primary-bold text-success mb-5">
          +
          {{
            endGameInformation.winner.user.eloScore -
            usersLinkedToConnectedPlayers[
              endGameInformation.winner.user.keycloakId
            ]!.eloScore
          }}
        </p>
        <div class="flex flex-col items-center bg-dark-light p-5 rounded-xl">
          <i class="fa-solid fa-crown" />
          <p class="small-title mb-5">Gagnant !</p>
          <AvatarFinder
            :avatar-id="endGameInformation.winner.user.avatarId"
            class="w-16 h-16"
          />
          <p class="font-primary-bold text-center mb-2">
            {{ endGameInformation.winner.user.pseudo }}
          </p>
          <p class="text-center">
            <span>Score ELO :</span>
            {{ endGameInformation.winner.user.eloScore }}
          </p>
        </div>
      </div>
      <div class="flex flex-col items-center">
        <p class="texte-center text-3xl font-primary-bold text-error mb-5">
          -
          {{
            usersLinkedToConnectedPlayers[
              endGameInformation.loser.user.keycloakId
            ]!.eloScore - endGameInformation.loser.user.eloScore
          }}
        </p>
        <div class="flex flex-col items-center bg-dark-light p-5 rounded-xl">
          <i class="fa-solid fa-bolt" />
          <p class="small-title mb-5">Perdant ...</p>
          <AvatarFinder
            :avatar-id="endGameInformation.loser.user.avatarId"
            class="w-16 h-16"
          />
          <p class="font-primary-bold text-center mb-2">
            {{ endGameInformation.loser.user.pseudo }}
          </p>
          <p class="text-center">
            <span>Score ELO :</span>
            {{ endGameInformation.loser.user.eloScore }}
          </p>
        </div>
      </div>
    </section>

    <RouterLink v-button-click-sound to="/" class="button mb-5">
      <i class="fa-solid fa-home mr-2" />
      Retourner au menu
    </RouterLink>
  </section>
</template>
