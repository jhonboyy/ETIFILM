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

    const handleMediaQueryChange = (event) => {
      if (event.matches) {
        const arrow = document.querySelector('.container-arrow');
        const menu = document.querySelector('.menu-mobile');
        const arrowUp = document.querySelector('.container-arrow-up');
        let previousScrollPosition = window.scrollY;

        const toggleArrowAndMenu = () => {
          const currentScrollPosition = window.scrollY;
          const atBottom = currentScrollPosition >= document.documentElement.scrollHeight - window.innerHeight;
          const atTop = currentScrollPosition === 0;

          if (currentScrollPosition > previousScrollPosition) {
            menu.classList.add('show-menu');
          } else {
            menu.classList.remove('show-menu');
          }

          previousScrollPosition = currentScrollPosition;

          if (atBottom) {
            menu.classList.remove('show-menu');
            arrowUp.classList.add('show-arrow');
          } else if (atTop) {
            menu.classList.remove('show-menu');
            arrow.classList.add('show-arrow');
          } else {
            menu.classList.add('show-menu');
            arrow.classList.remove('show-arrow');
            arrowUp.classList.remove('show-arrow');
          }
        };

        window.addEventListener('scroll', toggleArrowAndMenu);
        arrow.addEventListener('click', () => {
          menu.classList.toggle('show-menu');
        });

        // Store the function reference for later removal
        this.toggleArrowAndMenu = toggleArrowAndMenu;

      } else {
        if (this.toggleArrowAndMenu) {
          window.removeEventListener('scroll', this.toggleArrowAndMenu);
        }

        // Ensure menu is hidden and arrow states are reset when exiting mobile view
        const arrow = document.querySelector('.container-arrow');
        const menu = document.querySelector('.menu-mobile');
        const arrowUp = document.querySelector('.container-arrow-up');
        if (arrow && menu && arrowUp) {
          menu.classList.remove('show-menu');
          arrow.classList.remove('show-arrow');
          arrowUp.classList.remove('show-arrow');
        }
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
            duration: 2,
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
