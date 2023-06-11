<template>
  <div class="feature-card">
    <img class="feature-card__img" :src="`/images/features/${imgSrc}`" :alt="title" />
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
  max-width: 16rem;
  text-align: center;

  &__img {
    max-width: 16rem;
    border-radius: 50%;
  }

  &__title {
    font-family: $font-lato;
    font-weight: bold;
    font-size: 1.5rem;
  }
}
</style>
