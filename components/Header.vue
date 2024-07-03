<template>
  <div>
    <section class="section-1" id="inicio">
      <nav class="menu">
        <img src="/etifilm_logo.svg" alt="Etifilm logo">
        <NuxtLink :to="{ path: '/', hash: '#productos' }">Productos</NuxtLink>
        <NuxtLink :to="{ path: '/', hash: '#nosotros' }">Nosotros</NuxtLink>
        <NuxtLink :to="{ path: '/', hash: '#footer' }">Contacto</NuxtLink>
      </nav>
      <div class="first">
        <div class="container-text">
          <h1><span style="color: black">Más</span> que<br>Embalajes</h1>
          <p class="text-container-text">Somos la empresa Canaria líder de distribución de material de embalaje industrial.</p>
          <p class="text-container-text-mobile">Somos la empresa Canaria líder de distribución de material de embalaje industrial.</p>
          <div class="container-button">
            <button type="button" aria-label="solicitar presupuesto" onclick="location.href='#contacto'">Solicita tu presupuesto</button>
          </div>
        </div>
        <div class="first-container-svg">
          <img alt="Ilustración de un palet con tres cajas apiladas siendo embaladas por dos bobinas de film y dos rollos de precinto." src="public/images/Etifilm_1.svg">
        </div>
      </div>
      <div class="container-arrow">
        <object type="image/svg+xml" data="images/arrow.svg"></object>
      </div>
      <div class="container-arrow-up">
        <object type="image/svg+xml" data="images/arrow-up.svg"></object>
      </div>
      <nav class="menu-mobile">
        <NuxtLink :to="{ path: '/', hash: '#productos' }">Productos</NuxtLink>
        <NuxtLink :to="{ path: '/', hash: '#nosotros' }">Nosotros</NuxtLink>
        <NuxtLink :to="{ path: '/', hash: '#footer' }">Contacto</NuxtLink>
      </nav>
    </section>
    <section class="mobile-section">
      <p>Entendemos tu negocio y te ayudamos a crecer dándote un excelente servicio y calidad.</p>
    </section>
  </div>
</template>

<script>
import gsap from 'gsap'; // Importar GSAP

export default {
  name: 'HeaderSection',
  mounted() {
    const mediaQuery = window.matchMedia("(orientation:portrait) and (max-width: 950px)");

    const updateArrowAndMenuVisibility = (currentScrollPosition, previousScrollPosition, menu, arrow, arrowUp) => {
      const atBottom = currentScrollPosition >= document.documentElement.scrollHeight - window.innerHeight;
      const atTop = currentScrollPosition === 0;

      if (currentScrollPosition > previousScrollPosition) {
        menu.classList.add('show-menu');
      } else {
        menu.classList.remove('show-menu');
      }

      if (atBottom) {
        menu.style.display = "none";
        arrow.style.display = "none";
        arrowUp.style.display = "flex";
      } else if (atTop) {
        menu.style.display = "none";
        arrow.style.display = "flex";
        arrowUp.style.display = "none";
      } else {
        menu.style.display = "grid";
        arrow.style.display = "none";
        arrowUp.style.display = "none";
      }
    };

    const handleMediaQueryChange = (event) => {
      const arrow = document.querySelector('.container-arrow');
      const menu = document.querySelector('.menu-mobile');
      const arrowUp = document.querySelector('.container-arrow-up');

      if (event.matches && arrow && menu && arrowUp) {
        let previousScrollPosition = window.scrollY;

        const toggleArrowAndMenu = () => {
          const currentScrollPosition = window.scrollY;
          updateArrowAndMenuVisibility(currentScrollPosition, previousScrollPosition, menu, arrow, arrowUp);
          previousScrollPosition = currentScrollPosition;
        };

        window.addEventListener('scroll', toggleArrowAndMenu);
        arrow.addEventListener('click', () => menu.classList.toggle('show-menu'));

        // Trigger initial check on load
        updateArrowAndMenuVisibility(window.scrollY, previousScrollPosition, menu, arrow, arrowUp);
        previousScrollPosition = window.scrollY;

        // Store the function reference for later removal
        window.toggleArrowAndMenu = toggleArrowAndMenu;

      } else if (window.toggleArrowAndMenu) {
        window.removeEventListener('scroll', window.toggleArrowAndMenu);

        // Ensure menu is hidden and arrow states are reset when exiting mobile view
        menu.style.display = "none";
        arrow.style.display = "grid";
        arrowUp.style.display = "none";
      }
    };

    mediaQuery.addEventListener('change', handleMediaQueryChange);
    handleMediaQueryChange(mediaQuery);

    // Update the section height on mount and on resize
    const section1 = document.getElementById('inicio');
    const updateSection1Height = () => {
      const viewportHeight = window.innerHeight;
      const footer = document.querySelector('footer');
      if (footer) {
        const navBarHeight = footer.offsetHeight;
        section1.style.height = (viewportHeight - navBarHeight) + 'px';
      }
    };

    updateSection1Height();
    window.addEventListener('resize', updateSection1Height);

    // Animación de GSAP para SVG en montaje
    this.animateSVG();
  },
  methods: {
    animateSVG() {
      // Asegúrate de que el SVG esté completamente cargado
      this.$nextTick(() => {
        const svgElement = document.querySelector('.first-container-svg img');
        if (svgElement) {
          gsap.set(svgElement, { visibility: 'visible', y: -150 });
          gsap.to(svgElement, {
            duration: 0.5,
            opacity: 1,
            y: 0,
            delay: 0.5,
            ease: 'bounce.out'
          });
        }
      });
    }
  }
}
</script>

<style scoped>
/* Añadir estilos relevantes aquí */
</style>
