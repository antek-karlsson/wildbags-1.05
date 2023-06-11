<template>
  <div class="features">
    <FeatureCard v-for="item in features" :key="item.id" :title="item.title" :img-src="item.img" />
  </div>
</template>

<script setup lang="ts">
import { features } from '~/api/data/static/features';
</script>

<style lang="scss" scoped>
.features {
  @include flex($justify: center, $gap: 3.2rem);
  flex-wrap: wrap;
  padding: 2.4rem;

  @include tablet {
    padding: 4.8rem;
    gap: 10rem;
  }

  @include tablet-landscape {
    gap: 0;
    justify-content: space-between;
  }

  @include desktop-lg {
    padding: 6.4rem;
  }

  @include desktop-2xl {
    max-width: 80%;
    padding: 11.2rem;
  }
}
</style>
