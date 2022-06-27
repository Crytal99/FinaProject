<template lang="pug">
.product-view
  h2 Profile
  pre {{ user }}
</template>
<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';

const auth = useAuthStore();
const { user } = auth;
</script>
