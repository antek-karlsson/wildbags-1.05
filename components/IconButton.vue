<template>
  <button type="button" class="icon-button" :class="{ 'icon-button--cart': type === 'cart' }">
    <IconCarbon:shopping-cart v-if="type === 'cart'" />
    <div v-if="type === 'cart' && cart.cartQuantity > 0" class="icon-button__quantity">{{ cart.cartQuantity }}</div>
    <IconCarbon:menu v-if="type === 'menu' && !isNavOpen" />
    <IconCarbon:close v-if="type === 'menu' && isNavOpen" />
  </button>
</template>

<script setup lang="ts">
import { useCartStore } from '@/store/cart';

defineProps<{
  type: 'cart' | 'menu';
  isNavOpen?: boolean;
}>();

const cart = useCartStore();
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

  &--cart {
    position: relative;

    .icon-button__quantity {
      position: absolute;
      top: 2.5rem;
      left: -1.5rem;
      width: 3rem;
      height: 3rem;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 50%;
      background-color: $color-black;
      color: $color-white;
      z-index: 50;
    }
  }
}
</style>
