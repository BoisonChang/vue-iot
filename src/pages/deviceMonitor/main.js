import { createApp } from 'vue';
import App from './App.vue';
import i18n from '@/utils/i18n.js';
import store from '@/store/deviceMonitor'

let app = createApp(App);
app.use(i18n);
app.use(store)
app.mount('#app');
