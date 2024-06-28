<template>
  <section class="section-4" id="section-4">
    <div class="form-container">
      <h2>Solicita tu presupuesto</h2>
      <p>Explícanos qué necesitas y te contactaremos lo antes posible.</p>
      <form v-if="showForm && !submitting" class="contact-form" @submit.prevent="handleSubmit">
        <div class="form-field" v-for="field in formFields" :key="field.id">
          <input :type="field.type" v-model="field.value" :placeholder="field.placeholder" :name="field.name" :class="field.inputClass" :pattern="field.pattern" :inputmode="field.inputMode" required>
        </div>
        <div class="form-field">
          <input type="checkbox" id="consentimiento" v-model="consentimiento" required>
          <label for="consentimiento"><a href="./privacidad.html">He leído y acepto la política de privacidad</a></label>
        </div>
        <div class="button-container">
          <button class="button-send" type="submit">Enviar</button>
        </div>
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
import { useNuxtApp } from '#app';

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
      submitting: false,
      errorMessage: '',
      successMessage: '',
      showForm: true
    };
  },
  methods: {
    async handleSubmit() {
      this.submitting = true;
      this.errorMessage = '';
      this.successMessage = '';

      console.log('Form submitted, loading reCAPTCHA...');

      try {
        const nuxtApp = useNuxtApp();
        if (nuxtApp.$recaptcha && nuxtApp.$recaptcha.execute) {
          const token = await nuxtApp.$recaptcha.execute('submit');
          console.log('reCAPTCHA token obtained:', token);

          const formData = {
            consentimiento: this.consentimiento ? '1' : '',
            recaptcha: token,
            ...this.formFields.reduce((acc, field) => ({ ...acc, [field.name]: field.value }), {})
          };

          console.log('Sending form data:', formData);

          const response = await this.$axios.post('/api/send-mail', formData);

          if (response.data.success) {
            console.log('Form submission successful:', response.data);
            this.successMessage = response.data.message;
            this.showForm = false;
            setTimeout(this.resetForm, 3000);
          } else {
            console.error('Form submission error:', response.data.message);
            this.errorMessage = response.data.message;
            setTimeout(this.resetForm, 3000);
          }
        } else {
          console.error('reCAPTCHA execution failed: $recaptcha is not defined');
        }
      } catch (error) {
        console.error('Error during form submission:', error);
        this.errorMessage = `Error al enviar el formulario: ${error.message}`;
        setTimeout(this.resetForm, 3000);
      }

      this.submitting = false;
    },
    resetForm() {
      this.formFields.forEach(field => {
        field.value = '';
      });
      this.consentimiento = false;
      this.errorMessage = '';
      this.successMessage = '';
      this.showForm = true;
    }
  }
}
</script>
