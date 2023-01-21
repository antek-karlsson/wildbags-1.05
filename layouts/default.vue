<template>
  <div>
    <Navbar />
    <main>
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
main {
  height: 100vh;
  width: 100vw;
}
</style>
