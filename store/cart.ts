import type { CartItem } from '@/types/cart-item';

export const useCartStore = defineStore(
  'cart',
  () => {
    const cartItems = ref<CartItem[]>([]);

    const cartQuantity = computed(() => {
      return cartItems.value
        .map((item) => item.amount)
        .reduce((acc, curr) => {
          return acc + curr;
        }, 0);
    });

    const cartTotal = computed(() => {
      return cartItems.value
        .map((item) => item.amount * item.price)
        .reduce((acc, curr) => {
          return acc + curr;
        }, 0);
    });

    function addProductToCart(product: CartItem) {
      const id = cartItems.value.findIndex((item) => item.id === product.id);
      if (cartItems.value[id]) {
        cartItems.value[id].amount += product.amount;
      } else cartItems.value.push(product);
    }

    function incrementCartItem(itemId: string) {
      const targetItem = cartItems.value.find((item) => item.id === itemId);
      if (targetItem) {
        targetItem.amount++;
      }
    }

    function decrementCartItem(itemId: string) {
      const targetItem = cartItems.value.find((item) => item.id === itemId);
      if (targetItem) {
        targetItem.amount > 1 ? targetItem.amount-- : removeProductFromCart(itemId);
      }
    }

    function removeProductFromCart(productId: string) {
      cartItems.value = cartItems.value.filter((item) => item.id !== productId);
    }

    function resetCart() {
      cartItems.value = [];
    }

    return {
      cartItems,
      cartQuantity,
      cartTotal,
      addProductToCart,
      incrementCartItem,
      decrementCartItem,
      removeProductFromCart,
      resetCart,
    };
  },
  { persist: { storage: persistedState.cookiesWithOptions({ sameSite: 'strict' }) } },
);
