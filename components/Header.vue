<template>
  <div class="section-1-wrapper">
    <section class="section-1" id="inicio">
      <nav class="menu">
        <img src="/etifilm_logo.svg" alt="Etifilm logo">
        <NuxtLink :to="{ path: '/', hash: '#nosotros' }">Nosotros</NuxtLink>
        <NuxtLink :to="{ path: '/', hash: '#productos' }">Productos</NuxtLink>
        <NuxtLink :to="{ path: '/', hash: '#contacto' }">Contacto</NuxtLink>
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
        <object type="image/svg+xml" data="images/arrow.svg" aria-label="Alternative Text">Flecha hacia abajo></object>
      </div>
      <div class="container-arrow-up">
        <object type="image/svg+xml" data="images/arrow-up.svg" aria-label="Alternative Text">Flecha hacia arriba></object>
      </div>
      <nav class="menu-mobile">
        <NuxtLink :to="{ path: '/', hash: '#nosotros' }">Nosotros</NuxtLink>
        <NuxtLink :to="{ path: '/', hash: '#productos' }">Productos</NuxtLink>
        <NuxtLink :to="{ path: '/', hash: '#contacto' }">Contacto</NuxtLink>
      </nav>
    </section>
  </div>
  <section class="mobile-section">
      <p>Entendemos tu negocio y te ayudamos a crecer dándote un excelente servicio y calidad.</p>
  </section>
</template>

<script>
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

        // Verificar el estado inicial al cargar
        updateArrowAndMenuVisibility(window.scrollY, previousScrollPosition, menu, arrow, arrowUp);
        previousScrollPosition = window.scrollY;

        // Guardar la referencia de la función para eliminarla más tarde
        window.toggleArrowAndMenu = toggleArrowAndMenu;

      } else if (window.toggleArrowAndMenu) {
        window.removeEventListener('scroll', window.toggleArrowAndMenu);

        // Restablecer el estado de los elementos al salir de la vista móvil
        menu.style.display = "none";
        arrow.style.display = "grid";
        arrowUp.style.display = "none";
      }
    };

    mediaQuery.addEventListener('change', handleMediaQueryChange);
    handleMediaQueryChange(mediaQuery);

    // Actualizar la altura de la sección al montar y al cambiar el tamaño de la ventana
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
  }
}
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
