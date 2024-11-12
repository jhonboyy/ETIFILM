<template>
  <section class="section-4" id="contacto">
    <div class="form-container">
      <h2>Solicita tu presupuesto</h2>
      <p>Explícanos qué necesitas y te contactaremos lo antes posible.</p>

      <form v-if="showForm && !submitting" class="contact-form" @submit.prevent="handleSubmit">
        <div class="form-field">
          <input
            :name="randomField.name"
            type="text"
            v-model="formData.name"
            placeholder="Tu nombre"
            class="input-text"
            required
          />
        </div>
        <div class="form-field">
          <input
            :name="randomField.email"
            type="email"
            v-model="formData.email"
            placeholder="Tu correo"
            class="input-text"
            required
          />
        </div>
        <div class="form-field">
          <input
            :name="randomField.company"
            type="text"
            v-model="formData.company"
            placeholder="Empresa"
            class="input-text"
            required
          />
        </div>
        <div class="form-field">
          <input
            :name="randomField.phone"
            type="tel"
            v-model="formData.phone"
            placeholder="Teléfono"
            class="input-text"
            pattern="\d*"
            inputmode="numeric"
            required
          />
        </div>
        <div class="form-field">
          <input
            :name="randomField.message"
            v-model="formData.message"
            placeholder="Mensaje"
            class="input-text"
            required
          />
        </div>
        <div class="form-field">
          <input
            type="checkbox"
            id="consentimiento"
            v-model="consentimiento"
            required
          />
          <label for="consentimiento"
            ><a href="./privacidad">He leído y acepto la política de privacidad</a></label
          >
        </div>
        <!-- Campo honeypot mejorado -->
        <div class="honeypot-field" aria-hidden="true">
           <input type="text" id="bot-field" v-model="botField" name="bot-field" tabindex="-1" />
        </div>

        <!-- Campo oculto dinámico -->
        <input type="hidden" name="token" :value="token" />
        <input type="hidden" id="start-time" :value="startTime" />

        <div class="button-container">
          <button class="button-send" type="submit" :disabled="submitting || !jsEnabled">Enviar</button>
        </div>
      </form>

      <div v-if="submitting" class="message success">Enviando el formulario...</div>
      <div v-if="successMessage" class="message success">{{ successMessage }}</div>
      <div v-if="errorMessage" class="message error">{{ errorMessage }}</div>
    </div>
    <div class="contact-container-svg">
      <img
        alt="Ilustración de un personaje atrapado siendo embalado en una caja de film"
        src="/images/Etifilm_5.svg"
      />
    </div>
  </section>
</template>

<script>
import { ref, reactive, onMounted } from 'vue';

export default {
  name: 'ContactSection',
  setup() {
    const consentimiento = ref(false);
    const formData = reactive({
      name: '',
      email: '',
      company: '',
      phone: '',
      message: '',
    });
    const botField = ref('');
    const startTime = ref('');
    const submitting = ref(false);
    const errorMessage = ref('');
    const successMessage = ref('');
    const showForm = ref(true);
    const jsEnabled = ref(false);
    const token = ref('');

    // Generación de campo aleatorio
    const randomField = reactive({
      name: `name-${Math.random().toString(36).substring(2)}`,
      email: `email-${Math.random().toString(36).substring(2)}`,
      company: `company-${Math.random().toString(36).substring(2)}`,
      phone: `phone-${Math.random().toString(36).substring(2)}`,
      message: `message-${Math.random().toString(36).substring(2)}`,
    });

    const generateToken = () => {
      const randomString = Math.random().toString(36).substring(2);
      const timestamp = new Date().getTime().toString();
      token.value = btoa(timestamp + ':' + randomString);
    };

    const handleSubmit = async () => {
      submitting.value = true;
      errorMessage.value = '';
      successMessage.value = '';

      // Validación de honeypot y tiempo de envío
      const duration = new Date().getTime() - Number(startTime.value);
      if (botField.value || duration < 5000) {
        errorMessage.value = 'Bot detectado o tiempo de interacción insuficiente.';
        submitting.value = false;
        return;
      }

      const formToSend = {
        consentimiento: consentimiento.value ? '1' : '',
        name: formData.name,
        email: formData.email,
        company: formData.company,
        phone: formData.phone,
        message: formData.message,
        token: token.value,
        startTime: startTime.value,
        randomField, // Incluye los nombres de campos aleatorios
      };

      try {
        const response = await $fetch('/api/send-mail', {
          method: 'POST',
          body: JSON.stringify(formToSend),
          headers: { 'Content-Type': 'application/json' },
        });

        if (response.success) {
          successMessage.value = response.message;
          showForm.value = false;
          setTimeout(resetForm, 3000);
        } else {
          errorMessage.value = response.message;
          setTimeout(resetForm, 3000);
        }
      } catch (error) {
        errorMessage.value = `Error al enviar el formulario: ${error.message}`;
        setTimeout(resetForm, 3000);
      } finally {
        submitting.value = false;
      }
    };

    const resetForm = () => {
      Object.keys(formData).forEach((key) => {
        formData[key] = '';
      });
      consentimiento.value = false;
      botField.value = '';
      errorMessage.value = '';
      successMessage.value = '';
      showForm.value = true;
      startTime.value = '';
      generateToken();
    };

    onMounted(() => {
      startTime.value = new Date().getTime();
      generateToken();
      jsEnabled.value = true;
    });

    return {
      consentimiento,
      formData,
      botField,
      startTime,
      submitting,
      errorMessage,
      successMessage,
      showForm,
      handleSubmit,
      jsEnabled,
      token,
      randomField,
    };
  },
};
</script>

<style scoped>
.honeypot-field {
  position: absolute;
  left: -9999px;
  opacity: 0;
}
</style>
