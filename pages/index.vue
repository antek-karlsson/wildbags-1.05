<template>
  <div class="home-page">
    <Hero :text="heroText" />
    <InfoCard
      direction="ltr"
      img-url="/images/info-card-1.png"
      img-alt="Violet purse"
      title="Info"
      :text="[
        'Wszystkie produkty , które tu zobaczysz stworzone są zgodnie z ideą #upcykling , czyli zmniejszeniem zużycia surowców naturalnych oraz wytwarzanych odpadów poprzez tworzenie produktów z materiałów z drugiej ręki o wyższej wartości niż pojedyncze tworzywo użyte do stworzenia danej rzeczy.',
        'To rękodzieło, które powstaje z ciągłych poszukiwań oryginalnych materiałów z drugiego obiegu i jest kreatywnie przekształcane w zupełnie nową rzecz.',
      ]"
    />
    <SectionDivider />
    <InfoCard
      direction="rtl"
      img-url="/images/info-card-2.png"
      img-alt="high quality upcycled fabrics sign"
      title="Chciałabyś mieć wyjątkową torbę lub kosmetyczkę z wymarzonego materiału w ulubionym kolorze?"
      :text="['Napisz do mnie - dogramy wspólnie szczegóły :)', 'wildbags@wildbags.pl']"
    />
    <SectionDivider />
  </div>
</template>

<script setup lang="ts">
import { useProductsStore } from '@/store/products';
const heroText = 'ODKRYJ ABSOLUTNIE NIEPOSPOLITY ŚWIAT UPCYCLINGU I NOŚ SIĘ WYJĄTKOWO!';

const store = useProductsStore();

onMounted(() => {
  store.fetchAllProducts();
});
</script>

<style lang="scss" scoped>
.home-page {
  @include flex(column, null, null, 0);
}
</style>
