<template>
  <section class="section-3" id="section-3">
    <div class="products">
      <h2>Productos</h2>
      <div class="container-nav">
        <button type="button" aria-label="flecha a la izquierda" id="button--left" @click="moveLeft">
          <object id="arrow--left" type="image/svg+xml" data="/images/arrow_left.svg"></object>
        </button>
        <button type="button" aria-label="flecha a la derecha" id="button--right" @click="moveRight">
          <object id="arrow--right" type="image/svg+xml" data="/images/arrow_right.svg"></object>
        </button>
      </div>
      <div class="keen-slider" ref="sliderContainer">
        <div class="keen-slider__slide number-slide" v-for="(product, index) in products" :key="index">
          <h3>{{ product.title }}</h3>
          <h4>{{ product.description }}</h4>
          <div class="svg-container-products">
            <img :alt="product.alt" :src="product.image">
          </div>
        </div>
      </div>
    </div>
  </section>
</template>


<script>
import { useKeenSlider } from 'keen-slider/vue'
import 'keen-slider/keen-slider.min.css'
import { ref, onMounted, onBeforeUnmount } from 'vue';

export default {
  name: 'ProductsSection',
  setup() {
    const products = ref([
      { title: 'Film', description: 'Film manual y de máquina estirables. Tenemos diferentes preestiros y de material reciclado.', alt: 'ilustración de una caja siendo embalada con film transparente', image: '/images/Film.svg' },
      { title: 'Precinto', description: 'Acrílicos, base solvente y PVC de diferentes calidades, medidas y colores.', alt: 'ilustración de una caja y tres rollos de precinto al lado izquierdo', image: '/images/Precinto.svg' },
      { title: 'Big Bag', description: 'Reutilizables de diferentes medidas, materiales, pesos y especificaciones.', alt: 'ilustración de un big bag lleno', image: '/images/Bags.svg' },
      { title: 'Fleje', description: 'Polipropileno y reciclado para máquina y manual, en diferentes medidas.', alt: 'ilustración de una bobina de fleje', image: '/images/Fleje.svg' },
      { title: 'Poliolefina', description: 'Bobinas semitubo de diferentes medidas y gramajes.', alt: 'ilustración de una bobina de poliolefina y una bandeja de comida embalada', image: '/images/Poleolefina.svg' },
      { title: 'Cordel', description: 'Bobinas de cordel para máquinas industriales y manuales de tres cabos.', alt: 'ilustración de tres bobinas de cordel, una de ellas al frente, las otras dos detrás', image: '/images/Cordel.svg' }
    ]);

    const [sliderContainer, slider] = useKeenSlider({
      slides: {
        perView: 2,
        spacing: 0,
      },
    });

    const updateSlidesPerView = () => {
      if (slider.value) {
        slider.value.update({
          slides: {
            perView: window.innerWidth < 1024 ? 1 : 2,
          },
        });
      }
    };

    const moveLeft = () => {
      if (slider.value) {
        slider.value.prev();
      }
    };

    const moveRight = () => {
      if (slider.value) {
        slider.value.next();
      }
    };

    onMounted(() => {
      window.addEventListener('resize', updateSlidesPerView);
      updateSlidesPerView();
    });

    onBeforeUnmount(() => {
      window.removeEventListener('resize', updateSlidesPerView);
    });

    return { sliderContainer, moveLeft, moveRight, products };
  },
};
</script>


<style scoped>
.hidden {
  display: none;
}
</style>
