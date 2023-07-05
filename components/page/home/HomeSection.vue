<template>
  <div
    class="home-section"
    :class="{ 'home-section--ltr': direction === 'ltr', 'home-section--rtl': direction === 'rtl' }"
  >
    <div class="home-section__section">
      <img class="home-section__img" :src="imgUrl" :alt="imgAlt" />
    </div>
    <div class="home-section__section">
      <template v-if="forContact">
        <h2 class="home-section__title">{{ title }}</h2>
        <ContactForm />
      </template>
      <template v-else>
        <h2 class="home-section__title">{{ title }}</h2>
        <div class="home-section__text-container">
          <p v-for="(item, id) in text" :key="id" class="home-section__text" v-html="item" />
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  direction: 'ltr' | 'rtl';
  imgUrl: string;
  imgAlt: string;
  title: string;
  text?: string[];
  forContact?: boolean;
}>();
</script>

<style lang="scss" scoped>
.home-section {
  margin: 0 auto;
  width: 100%;
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

  &--ltr {
    @include flex(column, null, null, 3.2rem);

    @include tablet-landscape {
      @include flex(row, null, flex-start, 6.4rem);
    }
  }

  &--rtl {
    @include flex(column, null, null, 3.2rem);

    @include tablet-landscape {
      @include flex(row-reverse, null, flex-start, 6.4rem);
      .info-card__section {
        gap: 4.8rem;
      }

      .info-card__text-container {
        gap: 3.2rem;
      }
    }
  }

  &__section {
    @include flex(column, flex-start, flex-start, 3.2rem);
    width: 100%;

    @include tablet-landscape {
      width: 50%;
    }
  }

  &__img {
    width: 100%;
    border-radius: 1rem;

    @include tablet-landscape {
      max-width: 60rem;
      max-height: 60rem;
      object-fit: cover;
    }
  }

  &__title {
    font-size: 4.8rem;

    @include desktop {
      font-size: 5.6rem;
    }
  }

  &__text-container {
    @include flex(column, null, null, 1.6rem);
  }

  &__text {
    font-size: 1.8rem;
    letter-spacing: 0.15rem;

    @include tablet {
      font-size: 2.2rem;
    }

    @include tablet-landscape {
      font-size: 1.8rem;
    }

    @include desktop {
      font-size: 2.4rem;
    }
  }
}
</style>
