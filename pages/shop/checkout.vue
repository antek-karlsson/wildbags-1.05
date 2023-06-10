<template>
  <div class="checkout">
    <template v-if="checkoutStep === 1 || checkoutStep === 2">
      <template v-if="checkoutStep === 1">
        <div class="checkout__cart">
          <h2 class="checkout__cart-title">Mój koszyk</h2>
          <div class="checkout__cart-items">
            <CartItem
              v-for="(item, id) in cart.cartItems"
              :key="id"
              :item="item"
              @remove-product="cart.removeProductFromCart"
              @increment-amount="cart.incrementCartItem"
              @decrement-amount="cart.decrementCartItem"
            />
          </div>
        </div>
      </template>
      <template v-if="checkoutStep === 2">
        <div class="checkout__form-container">
          <h2 class="checkout__form-title">Dane</h2>
          <form class="checkout__form">
            <BaseTextInput v-model="order.email" type="email" required @blur="v$.email.$touch()">
              <template #label> Email </template>
              <template v-if="v$.email.$error && v$.email.$dirty" #error>
                <span v-for="error of v$.email.$errors" :key="error.$uid">{{ error.$message }}</span>
              </template>
            </BaseTextInput>
            <BaseTextInput v-model="order.first_name" type="text" required @blur="v$.first_name.$touch()">
              <template #label> Imię </template>
              <template v-if="v$.first_name.$error && v$.first_name.$dirty" #error>
                <span v-for="error of v$.first_name.$errors" :key="error.$uid">{{ error.$message }}</span>
              </template>
            </BaseTextInput>
            <BaseTextInput v-model="order.last_name" type="text" required @blur="v$.last_name.$touch()">
              <template #label> Nazwisko </template>
              <template v-if="v$.last_name.$error && v$.last_name.$dirty" #error>
                <span v-for="error of v$.last_name.$errors" :key="error.$uid">{{ error.$message }}</span>
              </template>
            </BaseTextInput>
            <BaseTextInput v-model="order.address" type="text" required @blur="v$.address.$touch()">
              <template #label> Adres </template>
              <template v-if="v$.address.$error && v$.address.$dirty" #error>
                <span v-for="error of v$.address.$errors" :key="error.$uid">{{ error.$message }}</span>
              </template>
            </BaseTextInput>
            <div class="checkout__form-row">
              <BaseTextInput v-model="order.post_code" type="text" required @blur="v$.post_code.$touch()">
                <template #label> Kod Pocztowy </template>
                <template v-if="v$.post_code.$error && v$.post_code.$dirty" #error>
                  <span v-for="error of v$.post_code.$errors" :key="error.$uid">{{ error.$message }}</span>
                </template>
              </BaseTextInput>
              <BaseTextInput v-model="order.city" type="text" required @blur="v$.city.$touch()">
                <template #label> Miasto </template>
                <template v-if="v$.city.$error && v$.city.$dirty" #error>
                  <span v-for="error of v$.city.$errors" :key="error.$uid">{{ error.$message }}</span>
                </template>
              </BaseTextInput>
            </div>
          </form>
        </div>
      </template>
      <div class="checkout__summary-wrapper">
        <div class="checkout__summary">
          <h2 class="checkout__summary-title">Podsumowanie zamówienia</h2>
          <div class="checkout__summary-content">
            <div class="checkout__summary-sum">
              <p>Razem</p>
              <p>{{ cart.cartTotal }} zł</p>
            </div>
            <div class="checkout__summary-sum">
              <p>Wysyłka</p>
              <p>{{ total >= 300 ? 'Za darmo' : delivery }}</p>
            </div>
            <VueMultiselect
              v-model="chosenDelivery"
              :options="DELIVERY_OPTIONS"
              :multiple="false"
              :searchable="false"
              :show-labels="false"
              label="name"
              track-by="id"
              placeholder="Wybierz opcję dostawy"
            >
              <template #option="{ option }">
                <div class="checkout__delivery-label">{{ option.name }} {{ option.price }}</div>
              </template>
            </VueMultiselect>
            <div class="checkout__summary-sum">
              <p>Suma</p>
              <p>{{ total }},00 zł</p>
            </div>
            <BaseButton @click="handleNextStep">
              {{ checkoutStep === 1 ? 'Dalej' : 'Zamów' }}
            </BaseButton>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="checkout__success">
        <h1 class="checkout__success-header">SUKCES!</h1>
        <div class="checkout__success-message">
          <p class="checkout__success-text">Otrzymaliśmy Twoje zamówienie.</p>
          <p class="checkout__success-text">
            Niebawem dostaniesz na podany adres e-mail wiadomość z danymi do wykonania przelewu i dalszymi szczegółami.
          </p>
        </div>
        <BaseButton to="/">Strona Główna</BaseButton>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { send } from '@emailjs/browser';
import uniqid from 'uniqid';
import VueMultiselect from 'vue-multiselect';

import { useNotification } from '@kyvg/vue3-notification';
import { useVuelidate } from '@vuelidate/core';

import {
  firstName,
  lastName,
  address,
  city,
  emailRequired,
  emailInvalid,
  postCodeRequired,
  postCodeInvalid,
} from '@/utils/validations';

import { useCartStore } from '@/store/cart';

const DELIVERY_OPTIONS = [
  { id: 1, name: 'InPost', price: 10 },
  { id: 2, name: 'Kurier', price: 15.0 },
  { id: 3, name: 'Odbiór osobisty', price: 0.0, suffix: 'zł' },
];

const config = useRuntimeConfig();

const cart = useCartStore();

const checkoutStep = ref(1);
const chosenDelivery = ref<{ id: number; name: string; price: number }>({ id: 1, name: 'InPost', price: 10 });
const order = ref({
  order_id: '',
  email: '',
  first_name: '',
  last_name: '',
  address: '',
  post_code: '',
  city: '',
  products: [],
  delivery: '',
  sum: '',
});

const validations = {
  email: {
    emailRequired,
    emailInvalid,
  },
  first_name: {
    firstName,
  },
  last_name: {
    lastName,
  },
  address: {
    address,
  },
  city: {
    city,
  },
  post_code: {
    postCodeRequired,
    postCodeInvalid,
  },
};

const v$ = useVuelidate(validations, order);

const { notify } = useNotification();

const delivery = computed(() =>
  chosenDelivery.value?.price > 0 ? chosenDelivery.value?.price + ',00 zł' : 'Za darmo',
);

const total = computed(() => (cart.cartTotal >= 300 ? cart.cartTotal : cart.cartTotal + chosenDelivery.value?.price));

async function placeOrder() {
  v$.value.$validate();
  if (v$.value.$invalid) {
    notify({
      group: 'warning',
      title: 'Ups! Uzupełnij wszystkie wymagane pola!',
      duration: 4000,
    });
  } else {
    await send(
      config.public.emailjsServiceId,
      config.public.emailjsOrderTemplateId,
      order.value,
      config.public.emailjsApiKey,
    ).then(
      // Success callback
      () => {
        cart.resetCart();
        checkoutStep.value++;
      },
      () => {
        // Error callback
        notify({
          group: 'error',
          title: 'Coś poszło nie tak... Spróbuj ponownie później',
          duration: 4000,
        });
      },
    );
  }
}

function handleNextStep() {
  checkoutStep.value === 1 ? checkoutStep.value++ : placeOrder();
}

onMounted(() => {
  if (cart.cartItems.length) {
    order.value.products = [...cart.cartItems.map((item) => `${item.id} | ${item.name} | ${item.amount} szt. ||`)];
    order.value.order_id = uniqid('WB_');
    order.value.delivery = chosenDelivery.value.name;
    order.value.sum = `${cart.cartTotal} zł`;
  }
});
</script>

<style lang="scss" scoped>
.checkout {
  min-height: 100vh;
  margin-block-start: 4.8rem;
  margin-inline: auto;
  max-width: 98rem;
  display: flex;
  flex-direction: column;
  gap: 4.8rem;
  padding: 2.4rem;

  @include tablet-landscape {
    flex-direction: row;
    gap: 4.8rem;
  }

  &__cart,
  &__form-container {
    flex: 3 0 0%;
  }

  &__cart-items,
  &__form {
    padding-block-start: 1.2rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  &__form {
    @include tablet-landscape {
      max-width: 75%;
    }
  }

  &__form-row {
    @include flex($align: flex-start);
  }

  &__summary-wrapper {
    flex: 1 0 0%;
  }

  &__cart-title,
  &__summary-title,
  &__form-title {
    font-size: 2.4rem;
    padding-block-end: 1.2rem;
    border-bottom: 1px solid $color-black;
  }

  &__summary-content {
    padding-block-start: 1.2rem;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  &__summary-sum {
    display: flex;
    justify-content: space-between;
    font-size: 1.6rem;
  }

  &__success {
    @include flex(column, flex-start, center, 3.2rem);
    max-width: 50%;
    margin: 0 auto;
    text-align: center;
  }

  &__success-header {
    font-size: 9.6rem;
  }

  &__success-text {
    font-size: 1.8rem;
  }
}
</style>
