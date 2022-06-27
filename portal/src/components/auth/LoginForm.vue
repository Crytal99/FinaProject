<template lang="pug">
.login-form
  .login-header
    .login-logo
      span.h3 Subscription
  .login-body
    Form(@submit.stop.prevent="submit")
      FormLayout
        TextField(
          v-model="loginData.shop"
          placeholder="your_shopify_domain.myshopify.com",
        )
          template(#label)
            .mb-2
              span Enter your store domain
              span.text-danger *
        .login-action
          Button(
            submit,
            primary,
            :loading="isProcessing"
          ) Login
  .login-footer
    a(href="javascript:;") &copy; Subscription 2022
    a(href="https://subscription.com/contact") Contact
    a(href="https://subscription.com/privacy") Privacy & terms
</template>
<script setup lang="ts">
import { ref, computed } from 'vue';

// Ref
const isProcessing = ref(false);

// React
const loginData = {
  shop: '',
};

const doLogin = (): void => {
  isProcessing.value = true;
  setTimeout(() => {
    console.log('login success');
    isProcessing.value = false;
  }, 2000);
};

/**
* Methods
*/
const submit = (): void => {
  doLogin();
  return false;
};
</script>
