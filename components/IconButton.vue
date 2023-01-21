<template>
  <button type="button" class="icon-button">
    <IconCarbon:shopping-cart v-if="type === 'cart'" />
    <IconCarbon:menu v-if="type === 'menu' && !isNavOpen" />
    <IconCarbon:close v-if="type === 'menu' && isNavOpen" />
  </button>
</template>

<script setup lang="ts">
defineProps<{
  type: 'cart' | 'menu';
  isNavOpen?: boolean;
}>();
</script>

<style lang="scss" scoped>
.icon-button {
  width: 4rem;
  height: 4rem;
  padding: 0.5rem;
  background-color: $color-black;
  border: 0.2rem solid transparent;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  svg {
    color: $color-white;
    font-size: 2rem;
    transition: all 0.3s ease-in-out;
  }

  @media (hover: hover) {
    &:hover {
      border-color: $color-black;
      background-color: $color-white;

      svg {
        color: $color-black;
      }
    }
  }
}
</style>
