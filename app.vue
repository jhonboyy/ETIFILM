<template>

  <Header />
  <AboutUs />
  <Products />
  <Contact />
  <Footer />


</template>

<script>
import Header from './components/Header.vue'
import AboutUs from './components/AboutUs.vue'
import Products from './components/Products.vue';
import Contact from './components/Contact.vue';
import Footer from './components/Footer.vue';




export default {
name: 'App',
components: {
  Header,
  AboutUs,
  Products,
  Contact,
  Footer,


}
}
</script>
