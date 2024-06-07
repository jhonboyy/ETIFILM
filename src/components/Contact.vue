<!-- Section4.vue -->
<template>
    <section class="section-4" id="section-4">
      <div class="form-container">
        <h2><span style="color: black;">Solicita tu presupuesto</span></h2>
        <p><span style="color: white;">Explícanos qué necesitas y te contactaremos lo antes posible.</span></p>
        <form class="contact-form" method="POST" id="myform" action="send.php">
          <div class="form-field">
            <input autocomplete="off" name="name" id="name" class="input-text" type="text" placeholder="Tu nombre" required>
          </div>
          <div class="form-field">
            <input autocomplete="off" name="email" id="email" class="input-text" type="email" placeholder="Tu correo" required>
          </div>
          <div class="form-field">
            <input autocomplete="off" name="company" id="company" class="input-text" type="text" placeholder="Empresa" required>
          </div>
          <div class="form-field">
            <input autocomplete="off" name="phone" id="phone" class="input-text" type="text" placeholder="Teléfono" required>
          </div>
          <div class="form-field">
            <input autocomplete="off" name="message" id="message" class="input-text" type="text" placeholder="Mensaje" required>
          </div>
          <div class="form-field">
            <input type="checkbox" id="consentimiento" name="consentimiento" required>
            <label for="consentimiento"><a href="./privacidad.html">He leído y acepto la política de privacidad</a></label>
          </div>
          <div class="form-field button-container">
            <button aria-label="enviar" class="button-send" data-callback='onSubmit' type="submit">Enviar</button>
            <div id="resultado"></div>
          </div>
          <input type="hidden" name="token" id="token" value="">
        </form>
      </div>
      <div class="contact-container-svg">
        <img alt="ilustración de un personaje siendo embalado por una bobina de film y dos rollos de precinto en una caja por accidente" src="images/Etifilm_5.svg">
      </div>
    </section>
  </template>
  
  <script>
  export default {
    name: 'ContactSection'
  }
  </script>
  
  <style scoped>
  /* Añade los estilos específicos para esta sección aquí */
  </style>
  