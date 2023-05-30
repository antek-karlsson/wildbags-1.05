<template>
  <div>
    <Navbar />
    <main>
      <slot />
    </main>
    <div id="modal-target"></div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
main {
  width: 100vw;
}
</style>
