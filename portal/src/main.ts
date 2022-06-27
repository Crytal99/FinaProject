import { createApp } from 'vue';
import { createPinia } from 'pinia';
import PolarisVue from '@qikify/polaris-vue';
import VueAxios from 'vue-axios';
import axios from '@/bootstrap/api-interceptor';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(createPinia());
app.use(PolarisVue);
app.use(router);
app.use(VueAxios, axios);

app.mount('#app');
