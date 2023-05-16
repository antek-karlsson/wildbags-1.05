<template>
  <component :is="component" :class="classes" v-bind="$attrs" :disabled="disabled" @click="$emit('click')">
    <slot />
  </component>
</template>

<script lang="ts" setup>
interface Props {
  colorScheme?: 'primary' | 'secondary' | 'secondary-border' | 'outline';
  disabled?: boolean;
}

const attrs = useAttrs();

const props = withDefaults(defineProps<Props>(), {
  colorScheme: 'primary',
  disabled: false,
});

defineEmits<{
  (e: 'click'): void;
}>();

const component = computed(() => {
  if (attrs.href) {
    return 'a';
  } else {
    return attrs.to ? defineNuxtLink({}) : 'button';
  }
});

const classes = computed(() => {
  return ['base-button', `base-button--${props.colorScheme}`];
});
</script>

<style lang="scss" scoped>
.base-button {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1.15rem 2.4rem;
  border: 0.01rem solid transparent;
  border-radius: 0.01rem;
  min-width: 12rem;
  // max-width: 30rem;
  font-family: $font-lato;
  font-weight: 500;
  font-size: 1.4rem;
  line-height: 1.2;
  letter-spacing: normal;
  white-space: nowrap;
  transition: all 0.2s;

  @media (hover: hover) {
    &:hover {
      cursor: pointer;
    }
  }

  // &:disabled {
  //   pointer-events: none;
  //   background-color: $gray--200;
  //   border: rem(1px) solid $gray--400;
  //   color: $gray--400;
  // }

  @include tablet {
    min-width: 15rem;
    max-width: 24rem;
  }

  @include tablet-landscape {
    width: auto;
  }

  &--primary {
    background-color: $color-black;
    border-color: $color-black;
    color: $color-white;
    transition: all 0.3s ease-out;

    @media (hover: hover) {
      &:hover {
        background-color: $color-white;
        color: $color-black;
      }
    }

    &:focus-visible {
      background-color: $color-white;
      color: $color-black;
    }
  }

  // &--secondary {
  //   background-color: $primary-color--medium;
  //   border-color: $primary-color--medium;
  //   color: $white;

  //   @media (hover: hover) {
  //     &:hover {
  //       background-color: $white;
  //       color: $primary-color--medium;
  //     }
  //   }

  //   &:focus-visible {
  //     background-color: $white;
  //     color: $primary-color--medium;
  //   }
  // }

  // &--secondary-border {
  //   background-color: $primary-color--medium;
  //   border-color: $gray--550;
  //   color: $white;

  //   @media (hover: hover) {
  //     &:hover {
  //       border-color: $primary-color--medium;
  //       background-color: $white;
  //       color: $primary-color--medium;
  //     }
  //   }

  //   &:focus-visible {
  //     border-color: $primary-color--medium;
  //     background-color: $white;
  //     color: $primary-color--medium;
  //   }
  // }

  // &--outline {
  //   background-color: $white;
  //   border-color: $primary-color--medium;
  //   color: $primary-color--medium;

  //   @media (hover: hover) {
  //     &:hover {
  //       background-color: $primary-color--medium;
  //       color: $white;
  //     }
  //   }

  //   &:focus-visible {
  //     background-color: $primary-color--medium;
  //     color: $white;
  //   }
  // }
}
</style>
