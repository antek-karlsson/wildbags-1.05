<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script lang="ts" setup>
import { useProductsStore } from '@/store/products';

const { fetchAllProducts } = useProductsStore();

onMounted(() => {
  fetchAllProducts();
});
</script>
