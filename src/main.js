import { createApp } from 'vue';
import App from './App.vue';
import './assets/styles/styles.css';
import { inject } from "@vercel/analytics"

inject();
createApp(App).mount('#app');