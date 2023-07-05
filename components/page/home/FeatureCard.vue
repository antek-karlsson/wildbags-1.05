<template>
  <div class="feature-card">
    <div class="feature-card__img-container">
      <img class="feature-card__img" :src="`/images/features/${imgSrc}`" :alt="title" />
    </div>
    <h3 class="feature-card__title">{{ title }}</h3>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string;
  imgSrc: string;
}

defineProps<Props>();
</script>

<style lang="scss" scoped>
.feature-card {
  @include flex(column, flex-start, center, 2.4rem);
  max-width: 20rem;
  text-align: center;

  &__img-container {
    width: 18rem;
    height: 18rem;
  }

  &__img {
    border-radius: 50%;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  &__title {
    font-family: $font-lato;
    font-weight: bold;
    font-size: 1.5rem;
  }
}
</style>
