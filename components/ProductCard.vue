<template>
  <div class="product-card">
    <NuxtLink :to="`/shop/${product.id}`">
      <div class="product-card__container">
        <img class="product-card__image" :src="imgUrl" :alt="product.name" />
        <p class="product-card__name">{{ product.name }}</p>
        <p class="product-card__price">{{ product.price }},00 PLN</p>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { Product } from '@/types/product';
import { useProductsStore } from '@/store/products';

const store = useProductsStore();

const props = defineProps<{
  product: Product;
}>();

const imgUrl = ref('');

async function setImgUrl() {
  const url = await store.getImgUrl(props.product.images[0]);
  imgUrl.value = url;
}

onMounted(() => {
  setImgUrl();
});
</script>

<style lang="scss" scoped>
.product-card {
  padding: 1.2rem;
  transition: all 0.3s ease-out;

  a {
    text-decoration: none;
    color: inherit;
  }

  &__container {
    @include flex(column);
    padding: 2.4rem;
    border-radius: 0.4rem;
    box-shadow: 0px 0px 13px -2px rgba(148, 148, 148, 1);
    text-align: center;
    min-height: 265px;
  }

  &__image {
    border-radius: 0.4rem;
    width: 100%;
  }

  &__name {
    font-family: $font-josefin;
    font-size: 1.6rem;
  }

  &__price {
    font-family: $font-josefin;
    font-size: 1.6rem;
  }

  @media (hover: hover) {
    &:hover {
      transform: scale(1.02);
    }
  }
}
</style>
