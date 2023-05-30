<template>
  <div class="product-swiper">
    <ClientOnly>
      <Swiper
        :modules="modules"
        :slides-per-view="isScreenMobile ? 1 : isScreenTablet ? 2 : isScreenTabletLandscape ? 3 : 4"
        :space-between="24"
        loop
        navigation
        @swiper="setProductSwiper"
      >
        <SwiperSlide v-for="product in store.allProducts" :key="product.id">
          <ProductCard :product="product" />
        </SwiperSlide>
      </Swiper>
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
import { useProductsStore } from '@/store/products';
import breakpoints from '@/api/data/constants/mediaQueries';

const store = useProductsStore();
const isScreenMobile = useMediaQuery(breakpoints.xs);
const isScreenTablet = useMediaQuery(breakpoints.sm);
const isScreenTabletLandscape = useMediaQuery(breakpoints.md);

const modules = [SwiperA11y, SwiperPagination, SwiperNavigation];
const productSwiper = ref(null);
function setProductSwiper(swiperInstance: HTMLElement) {
  productSwiper.value = swiperInstance;
}
</script>

<style lang="scss" scoped>
.product-swiper {
  padding-block: 2.4rem;
  margin-inline: 2.4rem;

  :deep(.swiper-button-prev),
  :deep(.swiper-button-next) {
    color: $color-black;
    &::after {
      font-size: 3rem;
    }
  }
}
</style>
