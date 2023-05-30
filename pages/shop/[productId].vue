<template>
  <div v-if="product" class="product">
    <h2 class="product__name">{{ product.name }}</h2>
    <div class="product__swiper">
      <ClientOnly>
        <Swiper
          :modules="modules"
          :thumbs="{ swiper: productThumbs }"
          :space-between="24"
          :slides-per-view="1"
          :pagination="isScreenTablet && { clickable: true }"
          loop
          navigation
          @swiper="setProductSwiper"
          @active-index-change="setActiveThumbnail(productSwiper.realIndex)"
        >
          <SwiperSlide v-for="(url, id) in imgUrls" :key="id">
            <img :src="url" :alt="product.name" />
          </SwiperSlide>
        </Swiper>
      </ClientOnly>
    </div>
    <div v-if="imgUrls && !isScreenTablet" class="product__thumbs">
      <Swiper :slides-per-view="imgUrls.length" :space-between="10" @swiper="setProductThumbs">
        <SwiperSlide v-for="(url, id) in imgUrls" :key="id">
          <div
            class="product__thumb"
            :class="{ 'product__thumb--active': id === activeThumb }"
            @click="activeThumb = id"
          >
            <img :src="url" :alt="product.name" />
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
    <div class="product__content">
      <div class="product__content-text">
        <p class="product__description">{{ product.description }}</p>
        <ul class="product__features">
          <li v-for="(feature, id) in product.features" :key="id" class="product__features-item">{{ feature }}</li>
        </ul>
        <p class="product__message">{{ PRODUCT_MESSAGE }}</p>
        <div class="product__sizing">
          <p class="product__sizing-title">Info o produkcie</p>
          <ul class="product__sizing-list">
            <li v-for="(item, id) in product.sizes" :key="id" class="product__sizing-item">{{ item }}</li>
          </ul>
        </div>
      </div>
      <form class="product__content-cart">
        <p class="product__price">{{ product.price }},00 zł</p>
        <input v-model="amount" type="number" />
        <BaseButton type="button" @click="handleAddProductToCart()">Dodaj do koszyka</BaseButton>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProductsStore } from '@/store/products';
import { useCartStore } from '@/store/cart';

import { PRODUCT_MESSAGE } from '@/api/data/constants/productMessage';
import breakpoints from '@/api/data/constants/mediaQueries';

import type { Product } from '@/types/product';

const route = useRoute();
const productStore = useProductsStore();
const { addProductToCart } = useCartStore();
const isScreenTablet = useMediaQuery(breakpoints.sm);

const product = ref<Product>();
const imgUrls = ref<string[]>();
const activeThumb = ref(0);
const amount = ref(1);

const productId = computed(() => route.params.productId as string);

const modules = [SwiperA11y, SwiperPagination, SwiperNavigation, SwiperThumbs];
const productSwiper = ref(null);
function setProductSwiper(swiperInstance: HTMLElement) {
  productSwiper.value = swiperInstance;
}

const productThumbs = ref(null);
function setProductThumbs(swiperInstance: HTMLElement) {
  productThumbs.value = swiperInstance;
}

async function setImgUrls() {
  const urls: string[] = [];
  for (const img of product.value.images) {
    const url = await productStore.getImgUrl(img);
    urls.push(url);
  }
  imgUrls.value = urls;
}

function handleAddProductToCart() {
  const cartItem = {
    id: product.value.id,
    name: product.value.name,
    price: product.value.price,
    imgUrl: imgUrls.value[0],
    amount: amount.value,
  };
  addProductToCart(cartItem);
  amount.value = 1;
}

function setActiveThumbnail(id: number) {
  activeThumb.value = id;
}

onMounted(async () => {
  await productStore.fetchSingleProduct(productId.value);
  product.value = productStore.singleProduct as Product;
  setImgUrls();
});
</script>

<style lang="scss" scoped>
.product {
  margin-inline: auto;
  max-width: 98rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 3.6rem;
  font-size: 3rem;
  padding: 2.4rem;

  @include tablet {
    padding: 4.8rem;
  }

  @include tablet-landscape {
    padding: 4.8rem;
  }

  @include desktop {
    padding: 6.4rem;
    gap: 3.2rem;
  }

  &__name {
    align-self: flex-start;
    font-size: 3.6rem;
  }

  &__swiper {
    width: 100%;

    img {
      max-width: 100%;
    }

    :deep(.swiper) {
      padding-block-end: 4rem;
    }

    :deep(.swiper-button-prev),
    :deep(.swiper-button-next) {
      background-color: $color-black;
      color: $color-white;
      &::after {
        font-size: 3rem;
      }
    }

    :deep(.swiper-pagination) {
      top: 80%;

      @include tablet {
        top: 90%;
      }
    }

    :deep(.swiper-pagination-bullet) {
      background: $color-black;
    }
  }

  &__thumbs {
    width: 100%;
  }

  &__thumb {
    display: flex;
    justify-content: center;
    align-items: center;
    max-width: 150px;
    border: 3px solid transparent;
    padding: 0.5rem;

    img {
      width: 100%;
    }

    &--active {
      border-color: $color-black;
    }
  }

  &__content {
    display: flex;
    flex-direction: column-reverse;
    gap: 4.8rem;

    @include tablet-landscape {
      flex-direction: row;
    }
  }

  &__content-text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 2.4rem;
    font-size: 1.8rem;
  }

  &__features {
    margin-inline-start: 2rem;
    list-style: circle;
  }

  &__features-item {
    margin-block-end: 1.6rem;
  }

  &__content-cart {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 2rem;

    input {
      max-width: 10rem;
      width: 100%;
      padding: 0.8rem;
      border: 0.1rem solid $color-black;
      border-radius: 0.01rem;
      background-color: inherit;
      font-family: $font-lato;
      font-size: 1.4rem;
      line-height: 1.57;
      color: $color-black;
      transition: all 0.2s ease-in-out;
    }
  }

  &__price {
    font-size: 2.4rem;
  }

  &__sizing-title {
    margin-bottom: 2.4rem;
  }

  &__sizing-list {
    margin-inline-start: 2rem;
    list-style: circle;
  }

  &__sizing-item {
    margin-block-end: 1.6rem;
  }
}
</style>
