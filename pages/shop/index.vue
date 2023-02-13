<template>
  <div v-if="store.allProducts">
    <h1>SHOP</h1>
    <div v-for="item in store.allProducts" :key="item.id">{{ item.name }}</div>
  </div>
</template>

<script setup lang="ts">
import { useProductsStore } from '@/store/products';

const store = useProductsStore();

onMounted(() => {
  store.fetchAllProducts();
});
</script>

<style scoped>
div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  font-size: 3rem;
}
</style>
