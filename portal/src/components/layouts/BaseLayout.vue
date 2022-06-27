<template lang="pug">
.base-layout(
  :class="routerClass"
)
  nav.navbar
    .container-fluid
      a.navbar-brand(
        href="#"
        @click="$router.push('/')"
      ) Search bar
  .wrapper
    aside.sidebar
      .sidebar-body
        ul.nav.sidebar-nav
          li.nav-item(v-for="item in sidebarItems" :key="item.name")
            router-link.nav-link(:to="{ name: item.name }")
              Icon(:source="item.icon")
              span {{ item.label }}
      .sidebar-footer
        ul.nav.sidebar-nav.mt-auto
          li.nav-item(v-for="item in sidebarFooterItems" :key="item.name")
            router-link.nav-link(:to="{ name: item.name }")
              Icon(:source="item.icon")
              span {{ item.label }}
        // Frame
          span Inside a frame
    main.main
      .main-content
        slot
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import HomeMajor from '@shopify/polaris-icons/dist/svg/HomeMajor.svg';
import ProductsMajor from '@shopify/polaris-icons/dist/svg/ProductsMajor.svg';
import ProfileMajor from '@shopify/polaris-icons/dist/svg/ProfileMajor.svg';
import SettingsMajor from '@shopify/polaris-icons/dist/svg/SettingsMajor.svg';
import CustomersMajor from '@shopify/polaris-icons/dist/svg/CustomersMajor.svg';
import StoreMajor from '@shopify/polaris-icons/dist/svg/StoreMajor.svg';
import LogOutMinor from '@shopify/polaris-icons/dist/svg/LogOutMinor.svg';

const route = useRoute();
const router = useRouter();
const routerClass = computed(() => route.matched.map((m) => `page--${m.name}`));
const sidebarItems = [
  {
    name: 'home',
    label: 'Home',
    icon: HomeMajor,
  },
  {
    name: 'products',
    label: 'Products',
    icon: ProductsMajor,
  },
  {
    name: 'subscribers',
    label: 'Subscribers',
    icon: CustomersMajor,
  },
  {
    name: 'setting',
    label: 'Settings',
    icon: SettingsMajor,
  },
];

const sidebarFooterItems = [
  {
    name: 'profile',
    label: 'My Account',
    icon: ProfileMajor,
  },
];

const logout = async () => {
  await useAuthStore().logout();
  router.push({ name: 'login' });
};
</script>
