<template>
  <ClientOnly>
    <div class="home-page">
      <Hero :text="heroText" />
      <ProductSwiper />
      <SectionDivider />
      <HomeSection
        direction="ltr"
        img-url="/images/info-card-1.png"
        img-alt="Violet purse"
        title="Info"
        :text="[
          'Każda rzecz, którą znajdziesz w moim sklepie jest rękodziełem wykonanym ze starannie wyselekcjonowanych tkanin.',
          'Każdy produkt jest unikatowy i niepowtarzalny :)',
          'Wild Bags specjalizuje się w doręczeniu Ci funkcjonalnych stylowych i nadzwyczajnych akcesoriów do codziennych potrzeb.',
          'Od kosmetyczek różnych rozmiarów po duże torby na ramię, od malutkich saszetek po wygodne etui na iPada czy laptopa.',
        ]"
      />
      <SectionDivider />
      <HomeSection
        direction="rtl"
        img-url="/images/info-card-2.png"
        img-alt="high quality upcycled fabrics sign"
        title="Chciałabyś mieć wyjątkową torbę lub kosmetyczkę z wymarzonego materiału w ulubionym kolorze?"
        :text="infoTexts"
      />
      <SectionDivider />
      <Features />
      <SectionDivider />
      <HomeSection
        for-contact
        direction="rtl"
        title="Kontaktuj się!"
        img-url="/images/contact-section.jpg"
        img-alt="Model showcasing a wild-bag"
      />
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
const heroText = 'ODKRYJ KOLOROWY ŚWIAT UNIKATOWEGO RZEMIOSŁA I ZAFUNDUJ SOBIE COŚ WYJĄTKOWEGO!';
const infoTexts = [
  'Napisz do mnie - dogramy wspólnie szczegóły :)',
  '<a href="mailto:wildbags.kontakt@gmail.com">wildbags.kontakt@gmail.com</a>',
];
</script>

<style lang="scss" scoped>
.home-page {
  @include flex(column, null, null);
}
</style>
