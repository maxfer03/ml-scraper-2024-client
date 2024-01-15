<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <!-- <header>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/about">About</RouterLink>
    </nav>
  </header> -->
  <RouterView />
</template>

<style scoped lang="scss">
header {
  @apply pt-10 flex flex-col gap-2 items-center;
  nav {
    @apply flex gap-2;
  }
}
</style>
