<template>
  <div class="custom">
    <h1 class="custom__title">{{ title }}</h1>
    <h2 class="custom__sub-title">{{ subtitle }}</h2>

    <div class="custom__text-container">
      <p v-for="(text, id) in texts" :key="id" class="custom__text">{{ text }}</p>
    </div>
    <img :src="image.src" :alt="image.alt" />
  </div>
</template>

<script setup lang="ts">
import { custom } from '~/api/data/static/custom';
const { title, subtitle, texts, image } = custom;
</script>

<style lang="scss" scoped>
.custom {
  @include flex(column, center, center, 3.2rem);
  padding: 2.4rem;

  @include tablet {
    padding: 4.8rem;
  }

  @include desktop-lg {
    padding: 6.4rem;
  }

  @include desktop-2xl {
    max-width: 80%;
    padding: 11.2rem;
  }

  img {
    width: 100%;
  }

  &__title {
    font-size: 6.4rem;
  }

  &__sub-title {
    font-family: $font-lato;
    font-size: 2.4rem;
  }

  &__text-container {
    max-width: 90rem;
    @include flex(column, center, flex-start, 3.2rem);
  }

  &__text {
    align-self: flex-start;
    font-family: $font-lato;
    font-size: 1.6rem;
    line-height: 1.87;
  }
}
</style>
