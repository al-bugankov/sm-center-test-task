import './assets/main.scss';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';
import PrimeVue from 'primevue/config';
import InputText from 'primevue/inputtext'
import Select from 'primevue/select';
import Checkbox from 'primevue/checkbox';
import Textarea from 'primevue/textarea'
import Button from 'primevue/button'
import ProgressSpinner from 'primevue/progressspinner'
import ToastService from 'primevue/toastservice'
import Toast from 'primevue/toast'
import Aura from '@primeuix/themes/aura';

const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      prefix: 'p',
      darkModeSelector: 'system',
    }
  }
});
app.use(ToastService)

app.component('app-input-text', InputText)
app.component('app-select', Select)
app.component('app-checkbox', Checkbox)
app.component('app-textarea', Textarea)
app.component('app-button', Button)
app.component('app-spinner', ProgressSpinner)
app.component('app-toast', Toast)

app.mount('#app');
