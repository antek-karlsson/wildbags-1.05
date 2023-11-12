<template>
  <div v-if="item" class="cart-item">
    <NuxtLink :to="`/shop/${item.id}`">
      <img class="cart-item__img" :src="item.imgUrl" :alt="item.name" />
    </NuxtLink>
    <div class="cart-item__details">
      <div class="cart-item__details-main">
        <NuxtLink class="cart-item__name" :to="`/shop/${item.id}`">
          <h2 class="cart-item__name">{{ item.name }}</h2>
        </NuxtLink>
        <div class="cart-item__amount-wrapper">
          <div class="cart-item__amount">
            <IconIc:sharpMinus class="cart-item__icon-minus" @click="$emit('decrement-amount', item.id)" />
            <p>{{ item.amount }}</p>
            <IconIc:sharpPlus class="cart-item__icon-plus" @click="$emit('increment-amount', item.id)" />
          </div>
          <p>{{ itemTotal }} zł</p>
        </div>
      </div>
      <p class="cart-item__price">{{ item.price }} zł</p>
    </div>
    <IconCarbon:close class="cart-item__icon-close" @click="$emit('remove-product', item.id)" />
  </div>
</template>

<script setup lang="ts">
import type { CartItem } from '@/types/cart-item';

interface Props {
  item: CartItem;
}

const props = defineProps<Props>();

defineEmits<{
  (e: 'remove-product', id: number): void;
  (e: 'increment-amount', id: number): void;
  (e: 'decrement-amount', id: number): void;
}>();

const itemTotal = computed(() => props.item.amount * props.item.price);
</script>

<style lang="scss" scoped>
.cart-item {
  display: flex;
  gap: 1.5rem;
  padding: 0.5rem;
  border-bottom: solid 1px $color-black;

  &__img {
    max-width: 150px;
    width: 100%;
  }

  &__details {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding-block-end: 1.4rem;
    font-size: 1.4rem;
  }

  &__name {
    text-decoration: none;
    color: inherit;
    font-size: 2rem;
  }

  &__details-main {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    gap: 1rem;

    @include tablet {
      flex-direction: row;
    }
  }

  &__amount-wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
  }

  &__amount {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.1rem;
    border: 0.01rem solid $color-black;
  }

  &__icon-plus,
  &__icon-minus {
    font-size: 2rem;
    color: $color-black;
    transition: all 0.3s ease-out;

    &:hover {
      cursor: pointer;
      transform: scale(1.2);
    }
  }

  &__icon-close {
    font-size: 3rem;
    color: red;
    transition: all 0.3s ease-out;

    &:hover {
      cursor: pointer;
      transform: scale(1.2);
    }
  }
}
</style>
