<template>
  <section class="section-1" id="section-1">
    <nav class="menu">
      <img src="@/assets/etifilm_logo.svg" alt="Etifilm logo">
      <a href="#section-3">Productos</a>
      <a href="#section-2">Nosotros</a>
      <a href="#footer">Contacto</a>
    </nav>
    <div class="first">
      <div class="container-text">
        <h1><span style="color: black">Más</span> que<br>Embalajes</h1>
        <p class="text-container-text">Somos la empresa Canaria líder de distribución de material de embalaje industrial.</p>
        <p class="text-container-text-mobile">Somos la empresa Canaria líder de distribución de material de embalaje industrial.</p>
        <div class="container-button">
          <button type="button" aria-label="solicitar presupuesto" onclick="location.href='#section-4'">Solicita tu presupuesto</button>
        </div>
      </div>
      <div class="first-container-svg">
        <img alt="Ilustración de un palet con tres cajas apiladas siendo embaladas por dos bobinas de film y dos rollos de precinto." src="/images/Etifilm_1.svg">
      </div>
    </div>
    <div class="container-arrow">
      <object type="image/svg+xml" data="./images/arrow.svg"></object>
    </div>
    <div class="container-arrow-up">
      <object type="image/svg+xml" data="./images/arrow-up.svg"></object>
    </div>
    <nav class="menu-mobile">
      <button type="button" aria-label="productos"><a href="#section-3">Productos</a></button>
      <button type="button" aria-label="nosotros"><a href="#section-2">Nosotros</a></button>
      <button type="button" aria-label="contacto"><a href="#footer">Contacto</a></button>
    </nav>
  </section>
  <section class="mobile-section">
    <p>Entendemos tu negocio y te ayudamos a crecer dándote un excelente servicio y calidad.</p>
  </section>
</template>

<script>
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
              menu.style.display = 'none';
              arrowUp.style.display = 'flex';
            } else if (atTop) {
              menu.style.display = 'none';
              arrow.style.display = 'flex';
            } else {
              menu.style.display = 'grid';
              arrow.style.display = 'none';
              arrowUp.style.display = 'none';
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
        }
      };
  
      mediaQuery.addEventListener('change', handleMediaQueryChange);
      handleMediaQueryChange(mediaQuery);
  
      // Update the section height on mount and on resize
      const section1 = document.getElementById('section-1');
  
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
/* Añadir estilos relevantes aquí */
</style>
