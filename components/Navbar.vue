<template>
  <div class="navbar">
    <IconButton class="navbar__cart-icon" type="cart" @click="isCartOpen = true" />
    <div class="navbar__logo">
      <NuxtLink to="/"><img src="@/assets/images/logo.png" alt="Wildbags logo" /></NuxtLink>
    </div>
    <ClientOnly>
      <template v-if="!isScreenMobile">
        <div class="navbar__links">
          <NuxtLink class="navbar__link" :class="{ 'navbar__link--active': currentRoute === '/' }" to="/">
            Home
          </NuxtLink>
          <NuxtLink class="navbar__link" :class="{ 'navbar__link--active': currentRoute === '/shop' }" to="/shop">
            Sklep
          </NuxtLink>
          <NuxtLink class="navbar__link" :class="{ 'navbar__link--active': currentRoute === '/about' }" to="/about">
            O mnie
          </NuxtLink>
          <NuxtLink class="navbar__link" :class="{ 'navbar__link--active': currentRoute === '/custom' }" to="/custom">
            Personalizowane
          </NuxtLink>
        </div>
      </template>
      <template v-if="isScreenMobile">
        <IconButton class="navbar__menu-icon" type="menu" :is-nav-open="isNavOpen" @click.prevent="toggleMobileNav" />
        <div class="navbar__links--mobile" :class="isNavOpen ? 'open' : 'closed'">
          <NuxtLink class="navbar__link" :class="{ 'navbar__link--active': currentRoute === '/' }" to="/">
            Home
          </NuxtLink>
          <NuxtLink class="navbar__link" :class="{ 'navbar__link--active': currentRoute === '/shop' }" to="/shop">
            Sklep
          </NuxtLink>
          <NuxtLink class="navbar__link" :class="{ 'navbar__link--active': currentRoute === '/about' }" to="/about">
            O mnie
          </NuxtLink>
          <NuxtLink class="navbar__link" :class="{ 'navbar__link--active': currentRoute === '/custom' }" to="/custom">
            Personalizowane
          </NuxtLink>
        </div>
      </template>
    </ClientOnly>
    <CartModal v-if="isCartOpen" @close-modal="isCartOpen = false" />
  </div>
</template>

<script setup lang="ts">
import breakpoints from '@/api/data/constants/mediaQueries';

const isNavOpen = ref(false);
const isCartOpen = ref(false);
const isScreenMobile = useMediaQuery(breakpoints.xs);
const route = useRoute();
const currentRoute = ref();

function toggleMobileNav() {
  isNavOpen.value = !isNavOpen.value;
}

watch(
  route,
  () => {
    currentRoute.value = route.path;
  },
  { immediate: true },
);

watch(isScreenMobile, () => {
  !isScreenMobile && isNavOpen.value === true ? (isNavOpen.value = false) : (isNavOpen.value = false);
});

watch(currentRoute, () => {
  isNavOpen.value = false;
});
</script>

<style lang="scss" scoped>
.navbar {
  width: 100%;
  display: flex;
  @include flex($direction: column, $justify: center, $align: center);
  padding: 2rem;

  &__cart-icon {
    align-self: flex-end;
  }

  &__menu-icon {
    align-self: flex-start;
  }

  &__links {
    @include flex(row, center, center, 3rem);

    &--mobile {
      width: 100%;
      @include flex(column, center, flex-start);
    }
  }

  &__link {
    text-decoration: none;
    color: $color-black;
    font-size: 2rem;
    padding: 1rem;
    font-family: $font-lato;

    &--active {
      border-bottom: 2px solid $color-black;
    }
  }
}

.open {
  display: flex;
}

.closed {
  display: none;
}
</style>
