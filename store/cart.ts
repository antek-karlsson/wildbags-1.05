import type { CartItem } from '@/types/cart-item';

export const useCartStore = defineStore('cart', () => {
  const cartItems = ref<CartItem[]>([]);

  function addProductToCart(product: CartItem) {
    const id = cartItems.value.findIndex((item) => item.id === product.id);
    if (cartItems.value[id]) {
      cartItems.value[id].amount += product.amount;
    } else cartItems.value.push(product);
  }

  function removeProductFromCart(productId: string) {
    cartItems.value = cartItems.value.filter((item) => item.id !== productId);
  }

  return {
    cartItems,
    addProductToCart,
    removeProductFromCart,
  };
});
