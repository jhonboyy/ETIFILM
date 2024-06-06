<template>
      <section class="section-1" id="section-1">
         <nav class="menu">
            <img src="@/assets/etifilm_logo.svg" alt="Etifilm logo">
            <a href="#section-3" >Productos</a>
            <a href="#section-2" >Nosotros</a>
            <a href="#footer" >Contacto</a>
         </nav>
         <div class="first">
            <div class="container-text">
               <h1><span style="color: black">Más</span> que<br>Embalajes</h1>
               <p class="text-container-text">Somos la empresa Canaria líder de distribución de material de embalaje industrial.</p>
               <p class="text-container-text-mobile">Somos la empresa Canaria líder de distribución de material de embalaje industrial.</p>
               <div class="container-button">
                  <button type="button" aria-label="solicitar presupuesto" onclick="location.href='#section-4'">solicita tu presupuesto</button>
               </div>
            </div>
            <div class="first-container-svg">
               <img alt="ilustración de un palet con tres cajas apiladas siendo embaladas por dos bobinas de film y dos rollos de precinto." src="/images/Etifilm_1.svg">
            </div>
         </div>
         <div class="container-arrow">
            <object type="image/svg+xml" data="./images/arrow.svg"></object>
         </div>
         <div class="container-arrow-up">
            <object type="image/svg+xml" data="./images/arrow-up.svg"></object>
         </div>
         <nav class="menu-mobile">
            <button type="button" aria-label="productos"><a href="#section-3">productos</a></button>
            <button type="button" aria-label="nosotros"><a href="#section-2">nosotros</a></button>
            <button type="button" aria-label="contacto"><a href="#footer">contacto</a></button>
         </nav>
      </section>
      <section class="mobile-section">
       <p>Entendemos  tu negocio y te ayudamos a crecer dándote un excelente servicio y calidad.</p>
      </section>
  </template>
  
  <script>
  export default {
    name: 'HeaderSection'
  }
  </script>
  
  