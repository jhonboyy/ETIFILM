<template>
  <section class="section-4" id="section-4">
    <div class="form-container">
      <h2>Solicita tu presupuesto</h2>
      <p>Explícanos qué necesitas y te contactaremos lo antes posible.</p>
      <form class="contact-form" v-if="showForm" @submit.prevent="handleSubmit">
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
      <div v-if="errorMessage" class="message error">{{ errorMessage }}</div>
      <div v-if="successMessage" class="message success">{{ successMessage }}</div>
    </div>
    <div class="contact-container-svg">
      <img alt="ilustración de un personaje atrapado siendo embalado en una caja de film" src="images/Etifilm_5.svg">
    </div>
  </section>
</template>

<script>
/* global grecaptcha */
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
    handleSubmit() {
      this.submitting = true;
      this.errorMessage = '';
      this.successMessage = '';
      grecaptcha.ready(() => {
        grecaptcha.execute(process.env.VUE_APP_RECAPTCHA_PUBLIC_KEY, {action: 'submit'}).then(token => {
          this.sendFormData(token);
        }).catch(error => {
          this.errorMessage = 'Error de reCAPTCHA: ' + error.message;
          this.submitting = false;
        });
      });
    },
    sendFormData(token) {
      const formData = new FormData();
      this.formFields.forEach(field => {
        formData.append(field.name, field.value);
      });
      formData.append('consentimiento', this.consentimiento ? '1' : '');
      formData.append('token', token);
            
      const endpoint = process.env.NODE_ENV === 'development' ? 'http://localhost:8000' : 'https://etifilm.vercel.app'

      fetch(`${endpoint}/send.php`, {
        method: 'POST',
        body: formData
      })

      .then(response => response.json())
      .then(this.handleResponse)
      .catch((error) => {
        this.errorMessage = 'Error al enviar el formulario: ' + error.message;
        this.submitting = false;
      });
    },
    handleResponse(data) {
      this.submitting = false;
      this.showForm = false;
      if (data.success) {
        this.successMessage = data.message;
      } else {
        this.errorMessage = data.message;
      }
      setTimeout(() => {
        this.resetForm();
      }, 3000);
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



