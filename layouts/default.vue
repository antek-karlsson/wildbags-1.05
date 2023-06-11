<template>
  <div>
    <ClientOnly>
      <notifications group="success" position="top center" classes="vue-notification success" />
      <notifications group="error" position="top center" classes="vue-notification error" />
      <notifications group="warning" position="top center" classes="vue-notification warn" />
    </ClientOnly>
    <Navbar />
    <main>
      <slot />
    </main>
    <Footer />
    <div id="modal-target"></div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
main {
  width: 100vw;
}
</style>
