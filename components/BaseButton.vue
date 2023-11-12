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
  return ['base-button', `base-button--${props.colorScheme}`, { 'base-button--disabled': props.disabled }];
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

  font-family: $font-lato;
  font-weight: 500;
  font-size: 1.4rem;
  line-height: 1.2;
  letter-spacing: normal;
  white-space: nowrap;
  text-decoration: none;
  transition: all 0.2s;

  @media (hover: hover) {
    &:hover {
      cursor: pointer;
    }
  }

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

  &--outline {
    background-color: $color-white;
    border-color: $color-black;
    color: $color-black;

    @media (hover: hover) {
      &:hover {
        background-color: $color-black;
        color: $color-white;
      }
    }

    &:focus-visible {
      background-color: $color-black;
      color: $color-white;
    }
  }

  &--disabled {
    background-color: rgba(206, 206, 206, 0.399);
    border-color: rgba(206, 206, 206, 0.399);
    color: $color-black;

    @media (hover: hover) {
      &:hover {
        background-color: rgba(206, 206, 206, 0.399);
        cursor: not-allowed;
      }
    }
  }
}
</style>
