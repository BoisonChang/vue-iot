import { createApp } from 'vue';
import App from './App.vue';
import i18n from '@/utils/i18n.js';
import store from '@/store/messageSetting'
import CKEditor from '@ckeditor/ckeditor5-vue';


let app = createApp(App);
app.use(i18n);
app.use(store);
app.use(CKEditor);
app.mount('#app');
