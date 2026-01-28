<template>
  <main>
    <h1 class="very-large-title mb-16">Stratège</h1>
    <RouterLink v-button-click-sound to="/play" class="button mb-5">
      <i class="fa-solid fa-gamepad mr-2" />
      Jouer !
    </RouterLink>
    <RouterLink v-button-click-sound to="/rules" class="button mb-5">
      <i class="fa-solid fa-book mr-2" />
      Lire les règles
    </RouterLink>
    <RouterLink v-button-click-sound to="/ranking" class="button">
      <i class="fa-solid fa-ranking-star mr-2" />
      Voir le classement
    </RouterLink>
    <footer
      class="flex flex-col md:flex-row gap-5 justify-between items-center fixed bottom-0 left-0 w-full py-5 px-10 bg-dark-light"
    >
      <div class="flex flex-col md:flex-row items-center gap-5">
        <a href="https://discord.gg/rKAgbnVEs5" target="_blank" rel="noopener">
          <i class="fa-brands fa-discord mr-1" />
          Discord
        </a>
        <a
          href="https://github.com/RudyDupuis/Stratege"
          target="_blank"
          rel="noopener"
        >
          <i class="fa-brands fa-github mr-1" />
          Github
        </a>
      </div>
      <div class="flex flex-col items-center md:items-end">
        <p class="text-sm">Version 2.0.0</p>
        <p class="text-sm">
          Copyright © {{ new Date().getFullYear() }} Rudy Dupuis
        </p>
      </div>
    </footer>
  </main>
</template>
