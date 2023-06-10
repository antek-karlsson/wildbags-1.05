<template>
  <div v-show="loading" class="spinner">
    <div class="clip" />
  </div>
</template>

<script lang="ts" setup>
// Component based on https://github.com/greyby/vue-spinner/blob/master/src/ClipLoader.vue

interface Props {
  loading?: boolean;
  color?: string;
  size?: string;
  radius?: string;
}

withDefaults(defineProps<Props>(), {
  loading: true,
  color: '#000000',
  size: '35px',
  radius: '100%',
});
</script>

<style lang="scss" scoped>
.spinner {
  text-align: center;
}

.clip {
  height: v-bind(size);
  width: v-bind(size);
  border-width: 2px;
  border-style: solid;
  border-color: v-bind(color) + '' + v-bind(color) + transparent;
  border-radius: v-bind(radius);
  background: 'transparent';
}

.spinner .clip {
  animation: clipDelay 0.75s 0s infinite linear;
  animation-fill-mode: both;

  display: inline-block;
}

@keyframes clipDelay {
  0% {
    transform: rotate(0deg);
  }
  50% {
    transform: rotate(180deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
