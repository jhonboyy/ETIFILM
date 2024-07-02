<template>
  <section class="PrivacySection">
    <h1>Política de Privacidad</h1>

    <div v-for="(section, index) in sections" :key="index">
      <button class="accordion" @click="togglePanel(index)">
        {{ section.title }}
        <img :src="arrowIcon" :class="{'arrow-down': activePanel === index, 'arrow-right': activePanel !== index}" alt="Arrow Icon">
      </button>
      <div class="panel" :class="{ 'panel-active': activePanel === index }">
        <div v-html="section.content" class="panel-content"></div>
      </div>
    </div>
  </section>
</template>

<script>
import arrowIcon from '/images/arrow.svg';

export default {
  data() {
    return {
      activePanel: null,
      arrowIcon,
      sections: [
        {
          title: 'Introducción y Recolección de Información',
          content: `
            <p class="text">En Etifilm Embalajes Industriales, valoramos tu privacidad y estamos comprometidos a proteger tus datos personales. Esta política de privacidad explica cómo recolectamos, usamos y compartimos tu información.</p>
            <p class="text">Recolectamos información personal que tú nos proporcionas voluntariamente a través de nuestros formularios en línea, específicamente:</p>
            <ul class="list">
              <li class="list-item">Nombre</li>
              <li class="list-item">Correo electrónico</li>
              <li class="list-item">Empresa</li>
              <li class="list-item">Teléfono</li>
              <li class="list-item">Mensaje</li>
            </ul>
          `
        },
        {
          title: 'Uso y Protección de la Información',
          content: `
            <p class="text">Utilizamos la información recolectada para:</p>
            <ul class="list">
              <li class="list-item">Responder tus consultas</li>
              <li class="list-item">Enviarte información relevante sobre nuestros servicios</li>
            </ul>
            <p class="text">No compartimos tu información personal con terceros, excepto cuando sea necesario para cumplir con la ley o en respuesta a un proceso legal válido.</p>
            <p class="text">Implementamos medidas de seguridad técnicas y organizativas para proteger tu información personal contra acceso no autorizado, alteración, divulgación o destrucción.</p>
          `
        },
        {
          title: 'Derechos del Usuario y Contacto',
          content: `
            <p class="text">En virtud del Reglamento General de Protección de Datos (RGPD) y otras leyes aplicables, tienes derecho a:</p>
            <ul class="list">
              <li class="list-item">Acceder a tus datos personales</li>
              <li class="list-item">Rectificar tus datos personales</li>
              <li class="list-item">Eliminar tus datos personales</li>
            </ul>
            <p class="text">Para ejercer estos derechos, por favor contáctanos en <a href="mailto:etifilm@gmail.com" class="link">etifilm@gmail.com</a>.</p>
            <p class="text">No utilizamos cookies en nuestro sitio web para recolectar información de los usuarios.</p>
            <p class="text">Nos reservamos el derecho de actualizar esta política de privacidad. Te notificaremos sobre cualquier cambio publicando la nueva política en nuestro sitio web.</p>
          `
        }
      ]
    };
  },
  methods: {
    togglePanel(index) {
      this.activePanel = this.activePanel === index ? null : index;
    }
  }
};
</script>

<style>
</style>
