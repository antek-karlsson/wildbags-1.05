<template>
  <div v-show="store.allProducts" class="shop-page">
    <ProductCard
      v-for="(product, index) in store.allProducts"
      :key="index"
      class="shop-page__card"
      :product="product"
    />
  </div>
</template>

<script setup lang="ts">
import { useProductsStore } from '@/store/products';

const store = useProductsStore();

onMounted(() => {
  store.fetchAllProducts();
});
</script>

<style lang="scss" scoped>
.shop-page {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 3rem;
  padding: 2.4rem;

  @include tablet {
    flex-direction: row;
    justify-content: center;
    flex-wrap: wrap;
    padding: 1.2rem;
  }

  @include tablet-landscape {
    padding: 4.8rem;
  }

  @include desktop {
    padding: 6.4rem;
    gap: 2rem;
  }

  &__card {
    @include tablet {
      max-width: 50%;
    }

    @include desktop {
      max-width: 30%;
    }

    @include desktop-lg {
      max-width: 20%;
    }
  }
}
</style>
