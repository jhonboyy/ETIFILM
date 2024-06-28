<template>
  <Header />
  <AboutUs />
  <Products />
  <Contact />
  <Footer />
</template>

<script setup>
import { onMounted } from 'vue';
import { useNuxtApp } from '#app';

// Importar los componentes
import Header from './components/Header.vue';
import AboutUs from './components/AboutUs.vue';
import Products from './components/Products.vue';
import Contact from './components/Contact.vue';
import Footer from './components/Footer.vue';

onMounted(() => {
  const nuxtApp = useNuxtApp();
  if (nuxtApp.$recaptcha && nuxtApp.$recaptcha.init) {
    nuxtApp.$recaptcha.init().catch(err => {
      console.error('reCAPTCHA initialization failed:', err);
    });
  } else {
    console.error('reCAPTCHA initialization failed: $recaptcha is not defined');
  }
});
</script>
