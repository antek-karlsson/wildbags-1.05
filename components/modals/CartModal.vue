<template>
  <Teleport to="#modal-target">
    <Modal @close-modal="$emit('close-modal')">
      <div class="cart-modal">
        <h1 class="cart-modal__title">Koszyk</h1>
        <div class="cart-modal__content">
          <div class="cart-modal__items">
            <div v-for="(item, id) in cart.cartItems" :key="id" class="cart-modal__item">
              <img class="cart-modal__item-img" :src="item.imgUrl" :alt="item.name" />
              <div class="cart-modal__item-details">
                <h2 class="cart-modal__item-name">{{ item.name }}</h2>
                <p class="cart-modal__item-amount">{{ item.amount }} x {{ item.price }} zł</p>
              </div>
              <IconCarbon:close class="cart-modal__icon-close" @click="cart.removeProductFromCart(item.id)" />
            </div>
          </div>
        </div>
        <div class="cart-modal__summary">
          <p class="cart-modal__total">Suma: {{ cart.cartTotal }},00 zł</p>
          <BaseButton class="cart-modal__button">Przejdź do zamówienia</BaseButton>
        </div>
      </div>
    </Modal>
  </Teleport>
</template>

<script setup lang="ts">
import { useCartStore } from '@/store/cart';

defineEmits<{
  (e: 'close-modal'): void;
}>();

const cart = useCartStore();
</script>

<style lang="scss" scoped>
.cart-modal {
  min-width: 30rem;
  min-height: 60rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  gap: 3.2rem;
  padding: 3.2rem;

  @include tablet {
    min-width: 50rem;
    padding: 4.8rem 8rem;
  }

  @include tablet-landscape {
    min-width: 60rem;
  }

  &__title {
    font-size: 6.4rem;
  }

  &__content {
    width: 100%;
    min-height: 40rem;
    max-height: 40rem;
    overflow: auto;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  &__items {
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 1.8rem;
  }

  &__item {
    display: flex;
    gap: 1.5rem;
    padding: 0.5rem;
    border-bottom: solid 1px $color-black;
  }

  &__item-img {
    max-width: 150px;
    width: 100%;
  }

  &__item-details {
    width: 100%;
    display: flex;
    flex-direction: column;
    padding-block-end: 1.4rem;
  }

  &__item-name {
    font-size: 2rem;
  }

  &__item-details {
    font-size: 1.4rem;
  }

  &__icon-close {
    font-size: 3rem;
    color: red;

    &:hover {
      cursor: pointer;
    }
  }

  &__summary {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  }

  &__total {
    font-size: 1.6rem;
  }

  &__button {
    align-self: center;
  }
}
</style>
