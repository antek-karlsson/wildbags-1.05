<template>
  <div class="shop-page">
    <template v-if="isLoading">
      <Loader size="100px" :loading="isLoading" />
    </template>
    <template v-if="!isLoading && store.allProducts">
      <ProductCard
        v-for="(product, index) in store.allProducts"
        :key="index"
        class="shop-page__card"
        :product="product"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import { useProductsStore } from '@/store/products';

const store = useProductsStore();

const imgIds = computed(() => !!store.allProducts && store.allProducts.map((product) => product.images));

const isLoading = computed(() => !store.allProducts && !imgIds.value);

onMounted(() => {
  store.fetchAllProducts();
});
</script>

<style lang="scss" scoped>
.shop-page {
  min-height: 50vh;
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
