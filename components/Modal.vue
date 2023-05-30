<template>
  <div class="base-modal">
    <div class="base-modal__mask" @click.self="$emit('close-modal')">
      <div class="base-modal__content">
        <IconCarbon:close class="icon-close" @click="$emit('close-modal')" />
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineEmits<{
  (e: 'close-modal'): void;
}>();
</script>

<style lang="scss" scoped>
.base-modal {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1000;

  &__mask {
    background-color: rgba($color-black, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    padding: 2rem 0;
  }

  &__content {
    max-height: 100%;
    overflow-y: auto;
    position: relative;
    background-color: $color-white;
    border-radius: 1.2rem;
    margin: 0 5%;

    @include desktop {
      max-width: 99.2rem;
      margin: 0 auto;
    }
  }
}

.icon-close {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  cursor: pointer;
  transition: all 0.2s;

  font-size: 2rem;
  color: $color-black;

  &:hover {
    opacity: 0.5;
  }
}
</style>
