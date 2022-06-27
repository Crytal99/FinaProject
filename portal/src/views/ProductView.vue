<template lang="pug">
.product-view
  h2 Products
  pre {{ user }}
  //- <input :value="text" @input="event => text = event.target.value">
</template>
<script setup lang="ts">
import { ref, inject } from 'vue';
// import axios from '@/bootstrap/api-interceptor';
import axios from 'axios';
const user = ref(null);

axios.get('user')
  .then((data) => {
    user.value = data;
    console.log('This is user data', data);
  });
</script>
