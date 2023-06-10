<template>
  <Teleport to="#modal-target">
    <Modal @close-modal="$emit('close-modal')">
      <div class="cart-modal">
        <h1 class="cart-modal__title">Koszyk</h1>
        <div class="cart-modal__content">
          <div class="cart-modal__items">
            <CartItem
              v-for="(item, id) in cart.cartItems"
              :key="id"
              :item="item"
              @remove-product="cart.removeProductFromCart"
              @increment-amount="cart.incrementCartItem"
              @decrement-amount="cart.decrementCartItem"
            />
          </div>
        </div>
        <div class="cart-modal__summary">
          <p class="cart-modal__total">Suma: {{ cart.cartTotal }},00 zł</p>
          <BaseButton class="cart-modal__button" :disabled="cart.cartQuantity < 1" @click="goToCheckout">
            Przejdź do zamówienia
          </BaseButton>
        </div>
      </div>
    </Modal>
  </Teleport>
</template>

<script setup lang="ts">
import { useCartStore } from '@/store/cart';

const emit = defineEmits<{
  (e: 'close-modal'): void;
}>();

const router = useRouter();
const cart = useCartStore();

function goToCheckout() {
  if (cart.cartQuantity < 1) return;

  router.push('/shop/checkout');
  emit('close-modal');
}
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
