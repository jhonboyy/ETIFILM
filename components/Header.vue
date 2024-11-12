<template>
  <div class="section-1-wrapper">
    <section class="section-1" id="inicio" ref="section1">
      <nav class="menu">
        <img src="/etifilm_logo.svg" alt="Etifilm logo" />
        <NuxtLink :to="{ path: '/', hash: '#nosotros' }">Nosotros</NuxtLink>
        <NuxtLink :to="{ path: '/', hash: '#productos' }">Productos</NuxtLink>
        <NuxtLink :to="{ path: '/', hash: '#contacto' }">Contacto</NuxtLink>
      </nav>
      <div class="first">
        <div class="container-text">
          <h1><span style="color: black">Más</span> que<br />Embalajes</h1>
          <p class="text-container-text">
            Somos la empresa Canaria líder de distribución de material de embalaje industrial.
          </p>
          <p class="text-container-text-mobile">
            Somos la empresa Canaria líder de distribución de material de embalaje industrial.
          </p>
          <div class="container-button">
            <button
              type="button"
              aria-label="solicitar presupuesto"
              onclick="location.href='#contacto'"
            >
              Solicita tu presupuesto
            </button>
          </div>
        </div>
        <div class="first-container-svg">
          <img
            alt="Ilustración de un palet con tres cajas apiladas siendo embaladas por dos bobinas de film y dos rollos de precinto."
            src="/images/Etifilm_1.svg"
          />
        </div>
      </div>
      <div class="container-arrow" v-show="arrowVisible" @click="toggleMenu">
        <object type="image/svg+xml" data="images/arrow.svg" aria-label="Flecha hacia abajo">
          Flecha hacia abajo
        </object>
      </div>
      <div class="container-arrow-up" v-show="arrowUpVisible">
        <object type="image/svg+xml" data="images/arrow-up.svg" aria-label="Flecha hacia arriba">
          Flecha hacia arriba
        </object>
      </div>
      <nav class="menu-mobile" :class="{ 'show-menu': menuVisible }">
        <NuxtLink :to="{ path: '/', hash: '#nosotros' }">Nosotros</NuxtLink>
        <NuxtLink :to="{ path: '/', hash: '#productos' }">Productos</NuxtLink>
        <NuxtLink :to="{ path: '/', hash: '#contacto' }">Contacto</NuxtLink>
      </nav>
    </section>
  </div>
  <section class="mobile-section">
    <p>
      Entendemos tu negocio y te ayudamos a crecer dándote un excelente servicio y calidad.
    </p>
  </section>
</template>

<script>
import { ref, onMounted, onBeforeUnmount, watch } from 'vue';
import { throttle } from 'lodash-es';


export default {
  name: 'HeaderSection',
  setup() {
    const isMobile = ref(false);
    const menuVisible = ref(false);
    const arrowVisible = ref(true);
    const arrowUpVisible = ref(false);

    const previousScrollPosition = ref(0);
    const scrollPosition = ref(0);

    const section1 = ref(null);

    const updateSection1Height = throttle(() => {
      if (typeof window !== 'undefined') {
        const viewportHeight = window.innerHeight;
        const footer = document.querySelector('footer');
        if (footer && section1.value) {
          const navBarHeight = footer.offsetHeight;
          section1.value.style.height = `${viewportHeight - navBarHeight}px`;
        }
      }
    }, 200);

    const handleMediaQueryChange = (event) => {
      isMobile.value = event.matches;
    };

    const handleScroll = throttle(() => {
      if (typeof window !== 'undefined') {
        scrollPosition.value = window.scrollY;
      }
    }, 200);

    onMounted(() => {
      if (typeof window !== 'undefined') {
        const mediaQuery = window.matchMedia(
          '(orientation:portrait) and (max-width: 950px)'
        );

        mediaQuery.addEventListener('change', handleMediaQueryChange);
        isMobile.value = mediaQuery.matches;

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', updateSection1Height);

        previousScrollPosition.value = window.scrollY;
        scrollPosition.value = window.scrollY;

        updateSection1Height();
      }
    });

    onBeforeUnmount(() => {
      if (typeof window !== 'undefined') {
        const mediaQuery = window.matchMedia(
          '(orientation:portrait) and (max-width: 950px)'
        );
        mediaQuery.removeEventListener('change', handleMediaQueryChange);
        window.removeEventListener('scroll', handleScroll);
        window.removeEventListener('resize', updateSection1Height);
      }
    });

    watch(
      [scrollPosition, isMobile],
      ([currentScrollPosition, isMobileValue]) => {
        if (typeof window !== 'undefined' && isMobileValue) {
          const atBottom =
            currentScrollPosition >=
            document.documentElement.scrollHeight - window.innerHeight;
          const atTop = currentScrollPosition === 0;

          if (currentScrollPosition > previousScrollPosition.value) {
            menuVisible.value = true;
          } else {
            menuVisible.value = false;
          }

          if (atBottom) {
            menuVisible.value = false;
            arrowVisible.value = false;
            arrowUpVisible.value = true;
          } else if (atTop) {
            menuVisible.value = false;
            arrowVisible.value = true;
            arrowUpVisible.value = false;
          } else {
            menuVisible.value = true;
            arrowVisible.value = false;
            arrowUpVisible.value = false;
          }

          previousScrollPosition.value = currentScrollPosition;
        } else {
          menuVisible.value = false;
          arrowVisible.value = true;
          arrowUpVisible.value = false;
        }
      },
      { immediate: true }
    );

    const toggleMenu = () => {
      menuVisible.value = !menuVisible.value;
    };

    return {
      isMobile,
      menuVisible,
      arrowVisible,
      arrowUpVisible,
      section1,
      toggleMenu,
    };
  },
};
</script>

<style scoped>
.first-container-svg img {
  opacity: 0;
  transform: translateY(-150px);
  animation: svgBounceIn 0.5s forwards 0.5s;
}

@keyframes svgBounceIn {
  0% {
    opacity: 0;
    transform: translateY(-150px);
  }
  60% {
    opacity: 1;
    transform: translateY(15px);
  }
  80% {
    transform: translateY(-5px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Añade otros estilos relevantes aquí */
</style>
