<template lang="pug">
.product-view
  h2 Products

  pre {{ user }}
</template>
<script setup lang="ts">
import { ref, inject } from 'vue';
import axios from '@/bootstrap/api-interceptor';
const user = ref(null);

axios.get('user')
  .then((data) => {
    user.value = data;
    console.log('This is user data', data);
  });

</script>
