import { createApp } from 'vue';
import App from './App.vue';
import i18n from '@/utils/i18n.js';

let app = createApp(App);
app.use(i18n);
app.mount('#app');
