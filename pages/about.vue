<template>
  <div class="about">
    <img src="images/about/about.jpg" alt="Wildbags founder: Dominika Makowska" />
    <h1 class="about__title">O mnie</h1>
    <div class="about__text-container">
      <p v-for="(text, id) in about" :key="id" class="about__text">{{ text }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { about } from '~/api/data/static/about';
</script>

<style lang="scss" scoped>
.about {
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

  &__title {
    font-size: 6.4rem;
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
