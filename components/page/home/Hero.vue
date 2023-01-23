<template>
  <div class="hero">
    <h1 class="hero__text">{{ text }}</h1>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  text: string;
}>();
</script>

<style lang="scss" scoped>
.hero {
  width: 100%;
  height: 100vh;
  text-align: center;
  background-image: linear-gradient(rgba($color-black, 0.5), rgba($color-black, 0.5)), url('@/assets/images/hero.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  @include flex(column);
  box-shadow: 0 1em 1em -1em rgba(0, 0, 0, 0.25);

  &__text {
    max-width: 90%;
    font-size: 4rem;
    font-weight: 700;
    letter-spacing: 0.4rem;
    color: $color-white;

    @include tablet {
      max-width: 70%;
      font-size: 6rem;
    }

    @include tablet-landscape {
      font-size: 8rem;
    }

    @include desktop {
      max-width: 50%;
    }

    @include desktop-lg {
      max-width: 50%;
      font-size: 10rem;
    }
  }
}
</style>
