<template>
  <section class="section-4" id="contacto">
    <div class="form-container">
      <h2>Solicita tu presupuesto</h2>
      <p>Explícanos qué necesitas y te contactaremos lo antes posible.</p>
      
      <form v-if="showForm && !submitting" class="contact-form" @submit.prevent="handleSubmit">
        <div class="form-field" v-for="field in formFields" :key="field.id">
          <input :type="field.type" v-model="field.value" :placeholder="field.placeholder" :name="field.name" :class="field.inputClass" :pattern="field.pattern" :inputmode="field.inputMode" required>
        </div>
        <div class="form-field">
          <input type="checkbox" id="consentimiento" v-model="consentimiento" required>
          <label for="consentimiento"><a href="./privacidad">He leído y acepto la política de privacidad</a></label>
        </div>
        
        <div class="button-container">
          <button class="button-send" type="submit">Enviar</button>
        </div>

        <!-- Campo oculto (honeypot) -->
        <div style="display:none;">
          <label for="bot-field">Leave this field empty</label>
          <input type="text" id="bot-field" v-model="botField">
        </div>

        <!-- Campo oculto para medir el tiempo -->
        <input type="hidden" id="start-time" :value="startTime">
      </form>

      <div v-if="submitting" class="message success">Enviando el formulario...</div>
      <div v-if="successMessage" class="message success">{{ successMessage }}</div>
      <div v-if="errorMessage" class="message error">{{ errorMessage }}</div>
    </div>
    
    <div class="contact-container-svg">
      <img alt="ilustración de un personaje atrapado siendo embalado en una caja de film" src="public/images/Etifilm_5.svg">
    </div>
  </section>
</template>

<script>
import gsap from 'gsap';

export default {
  name: 'ContactSection',
  data() {
    return {
      consentimiento: false,
      formFields: [
        { id: 'name', type: 'text', value: '', placeholder: 'Tu nombre', name: 'name', inputClass: 'input-text', label: 'Nombre' },
        { id: 'email', type: 'email', value: '', placeholder: 'Tu correo', name: 'email', inputClass: 'input-text', label: 'Correo' },
        { id: 'company', type: 'text', value: '', placeholder: 'Empresa', name: 'company', inputClass: 'input-text', label: 'Empresa' },
        { id: 'phone', type: 'tel', value: '', placeholder: 'Teléfono', name: 'phone', inputClass: 'input-text', label: 'Teléfono', pattern: '\\d*', inputMode: 'numeric' },
        { id: 'message', type: 'textarea', value: '', placeholder: 'Mensaje', name: 'message', inputClass: 'input-text', label: 'Mensaje' }
      ],
      botField: '', // Campo honeypot
      startTime: '', // Tiempo de inicio
      submitting: false,
      errorMessage: '',
      successMessage: '',
      showForm: true,
      showRecaptcha: true // Asegúrate de controlar la visibilidad según necesites
    };
  },
  methods: {
    handleSubmit() {
      this.submitting = true;
      this.errorMessage = '';
      this.successMessage = '';

      // Verifica el campo honeypot y el tiempo de sumisión
      console.log('Start time:', this.startTime);

      const duration = new Date().getTime() - Number(this.startTime);
      if (this.botField || duration < 3000) { // Ajusta el tiempo mínimo según sea necesario
        this.errorMessage = 'Bot detected!';
        this.submitting = false;
        return;
      }

      const formData = {
        consentimiento: this.consentimiento ? '1' : '',
        ...this.formFields.reduce((acc, field) => ({ ...acc, [field.name]: field.value }), {}),
        botField: this.botField,
        startTime: this.startTime
      };

      console.log('Sending form data:', formData);

      $fetch('/api/send-mail', {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: { 'Content-Type': 'application/json' }
      })
      .then(response => {
        if (response.success) {
          this.successMessage = response.message;
          this.showForm = false;
          setTimeout(this.resetForm, 3000);
        } else {
          this.errorMessage = response.message;
          setTimeout(this.resetForm, 3000);
        }
      })
      .catch(error => {
        this.errorMessage = `Error al enviar el formulario: ${error.message}`;
        setTimeout(this.resetForm, 3000);
      })
      .finally(() => {
        this.submitting = false;
      });
    },

    resetForm() {
      this.formFields.forEach(field => {
        field.value = '';
      });
      this.consentimiento = false;
      this.botField = ''; // Resetea el campo honeypot
      this.errorMessage = '';
      this.successMessage = '';
      this.showForm = true;
      this.startTime = ''; // Resetea el tiempo de inicio
    },
    animateSVG() {
    this.$nextTick(() => {
      const svgElement = document.querySelector('.contact-container-svg img');
      if (svgElement) {
        const tl = gsap.timeline({ repeat: -1, repeatDelay: 2 }); // Repite indefinidamente con una pausa entre cada repetición
        
        tl.to(svgElement, {
          x: -10,
          rotation: -5,
          duration: 0.1,
          yoyo: true,
          repeat: 2, // Número de veces que tiembla en cada ciclo
          ease: "power1.inOut"
        }).to(svgElement, {
          x: 0, // Vuelve a la posición inicial
          rotation: 0,
          duration: 0.1,
          ease: "power1.inOut"
        });
      }
    });
  }
  },

  mounted() {
    this.animateSVG();
    this.startTime = new Date().getTime(); // Inicializa el tiempo de inicio al montar el componente
  }
};
</script>
