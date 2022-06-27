<template lang="pug">
.page-auth
  .vh-100.d-flex.align-items-center.justify-content-center
    Spinner(message="Authenticating...")
</template>
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import type { ILoginOAuthData } from '@/models/auth';

const isProcessing = ref(false);
const route = useRoute();
const router = useRouter();

const auth = async (): Promise<void> => {
  const { token, expires_in: expiresIn } = route.query;
  const expiredAt = Date.now() + (expiresIn - 60) * 1000;
  const payload: ILoginOAuthData = {
    token,
    expiredAt,
  };

  await useAuthStore().login(payload);
  await useAuthStore().getUser();

  // Go to home
  router.push({ name: 'home' });
};

const doAuth = async (): Promise<void> => {
  isProcessing.value = true;
  try {
    await auth();
  } catch (error) {
    console.error(error);
  }
  isProcessing.value = false;
};

onMounted(() => {
  doAuth();
});
</script>
