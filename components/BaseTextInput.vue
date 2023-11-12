<template>
  <div :class="inputClasses">
    <label v-if="slots.label" v-bind="$attrs" class="base-input__label"><slot name="label" /></label>
    <div class="base-input__container">
      <input
        v-if="!isTextarea"
        class="base-input__container-input"
        v-bind="$attrs"
        :type="type"
        :value="modelValue"
        @input="onInput"
        @blur="emit('blur')"
      />
      <textarea
        v-else
        class="base-input__container-textarea"
        v-bind="$attrs"
        :type="type"
        :value="modelValue"
        @input="onInput"
        @blur="emit('blur')"
      />
      <div v-show="slots.error" class="base-input__container-error"><slot name="error" /></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const slots = useSlots();

interface Props {
  type: 'text' | 'email' | 'password';
  modelValue: string;
  isTextarea?: boolean;
}

withDefaults(defineProps<Props>(), {
  type: 'text',
  modelValue: '',
  isTextArea: false,
});

const emit = defineEmits<{
  (e: 'blur'): void;
  (e: 'update:modelValue', event: string): void;
}>();

const inputClasses = computed(() => {
  return ['base-input', { 'base-input--hasError': slots.error }];
});

function onInput(event: Event) {
  emit('update:modelValue', (event.target as HTMLInputElement).value);
}
</script>

<style lang="scss" scoped>
.base-input {
  font-family: $font-lato;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 0.8rem;

  &__label {
    display: block;
    font-weight: 500;
    font-size: 1.4rem;
    line-height: 1.2;
    text-transform: uppercase;
    color: $color-black;
    opacity: 0.7;
  }

  &__container {
    width: 100%;
  }

  &__container-input {
    @include input;
  }

  &__container-textarea {
    @include input;
    min-height: 10rem;
    resize: none;
  }

  &__container-error {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    gap: 0.08rem;
    margin-top: 0.8rem;
    font-weight: 400;
    font-size: 1rem;
    line-height: 1.2;
    letter-spacing: 0.04rem;
    color: red;
  }

  &--hasError {
    &__input {
      border: 1px solid red;
    }
  }
}
</style>
