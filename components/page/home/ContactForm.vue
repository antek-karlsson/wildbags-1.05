<template>
  <form class="contact-form">
    <BaseTextInput v-model="model.email" type="email" required @blur="v$.email.$touch()">
      <template #label> Email </template>
      <template v-if="v$.email.$error && v$.email.$dirty" #error>
        <span v-for="error of v$.email.$errors" :key="error.$uid">{{ error.$message }}</span>
      </template>
    </BaseTextInput>
    <BaseTextInput v-model="model.name" type="text" required @blur="v$.name.$touch()">
      <template #label> Imię </template>
      <template v-if="v$.name.$error && v$.name.$dirty" #error>
        <span v-for="error of v$.name.$errors" :key="error.$uid">{{ error.$message }}</span>
      </template>
    </BaseTextInput>
    <BaseTextInput v-model="model.subject" type="text" required @blur="v$.subject.$touch()">
      <template #label> Temat </template>
      <template v-if="v$.subject.$error && v$.subject.$dirty" #error>
        <span v-for="error of v$.subject.$errors" :key="error.$uid">{{ error.$message }}</span>
      </template>
    </BaseTextInput>
    <BaseTextInput v-model="model.message" is-textarea type="text" required @blur="v$.message.$touch()">
      <template #label> Wiadomość </template>
      <template v-if="v$.message.$error && v$.message.$dirty" #error>
        <span v-for="error of v$.message.$errors" :key="error.$uid">{{ error.$message }}</span>
      </template>
    </BaseTextInput>
  </form>
  <BaseButton type="submit" :disabled="v$.$invalid" @click.once="sendMessage">Wyślij</BaseButton>
  <ClientOnly>
    <notifications group="success--contact" position="bottom center" classes="vue-notification success" />
    <notifications group="error--contact" position="bottom center" classes="vue-notification error" />
    <notifications group="warning--contact" position="bottom center" classes="vue-notification warn" />
  </ClientOnly>
</template>

<script setup lang="ts">
import { useNotification } from '@kyvg/vue3-notification';
import { useVuelidate } from '@vuelidate/core';
import { send } from '@emailjs/browser';
import { emailRequired, emailInvalid, firstName, subject, message } from '@/utils/validations';

const config = useRuntimeConfig();
const { notify } = useNotification();

const model = ref({
  email: '',
  name: '',
  subject: '',
  message: '',
});

const initialModel = {
  email: '',
  name: '',
  subject: '',
  message: '',
};

const validations = {
  email: {
    emailRequired,
    emailInvalid,
  },
  name: {
    firstName,
  },
  subject: {
    subject,
  },
  message: {
    message,
  },
};

const v$ = useVuelidate(validations, model);

async function sendMessage() {
  v$.value.$validate();
  if (v$.value.$invalid) {
    notify({
      group: 'warning--contact',
      title: 'Ups! Uzupełnij wszystkie wymagane pola!',
      duration: 4000,
    });
  } else {
    await send(
      config.public.emailjsServiceId,
      config.public.emailjsContactTemplateId,
      model.value,
      config.public.emailjsApiKey,
    ).then(
      // Success callback
      () => {
        v$.value.$reset();
        model.value = initialModel;
        notify({
          group: 'success--contact',
          title: 'Wiadomość wysłana!',
          duration: 4000,
        });
      },
      () => {
        // Error callback
        notify({
          group: 'error--contact',
          title: 'Coś poszło nie tak... Spróbuj ponownie później',
          duration: 4000,
        });
      },
    );
  }
}
</script>

<style lang="scss" scoped>
.contact-form {
  min-width: 32.5rem;
  width: 100%;
  @include flex(column, flex-start, center, 1.5rem);

  @include tablet-landscape {
    max-width: 90%;
  }
}
</style>
