<template>
  <section class="section-4" id="contacto">
    <div class="form-container">
      <h2>Solicita tu presupuesto</h2>
      <p>Explícanos qué necesitas y te contactaremos lo antes posible.</p>
      
      <form v-if="showForm && !submitting" class="contact-form" @submit.prevent="handleSubmit">
        <div class="form-field">
          <input
            type="text"
            v-model="formData.name"
            placeholder="Tu nombre"
            name="name"
            class="input-text"
            required
          />
        </div>
        <div class="form-field">
          <input
            type="email"
            v-model="formData.email"
            placeholder="Tu correo"
            name="email"
            class="input-text"
            required
          />
        </div>
        <div class="form-field">
          <input
            type="text"
            v-model="formData.company"
            placeholder="Empresa"
            name="company"
            class="input-text"
            required
          />
        </div>
        <div class="form-field">
          <input
            type="tel"
            v-model="formData.phone"
            placeholder="Teléfono"
            name="phone"
            class="input-text"
            pattern="\d*"
            inputmode="numeric"
            required
          />
        </div>
        <div class="form-field">
          <textarea
            v-model="formData.message"
            placeholder="Mensaje"
            name="message"
            class="input-text"
            required
          ></textarea>
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
        <div class="button-container">
          <button class="button-send" type="submit">Enviar</button>
        </div>
        <!-- Campo oculto (honeypot) -->
        <div style="display: none;">
          <label for="bot-field">Leave this field empty</label>
          <input type="text" id="bot-field" v-model="botField" />
        </div>
        <!-- Campo oculto para medir el tiempo -->
        <input type="hidden" id="start-time" :value="startTime" />
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
    const botField = ref(''); // Campo honeypot
    const startTime = ref(''); // Tiempo de inicio
    const submitting = ref(false);
    const errorMessage = ref('');
    const successMessage = ref('');
    const showForm = ref(true);

    const handleSubmit = async () => {
      submitting.value = true;
      errorMessage.value = '';
      successMessage.value = '';

      // Verifica el campo honeypot y el tiempo de sumisión
      console.log('Start time:', startTime.value);

      const duration = new Date().getTime() - Number(startTime.value);
      if (botField.value || duration < 3000) {
        // Ajusta el tiempo mínimo según sea necesario
        errorMessage.value = 'Bot detectado!';
        submitting.value = false;
        return;
      }

      const formToSend = {
        consentimiento: consentimiento.value ? '1' : '',
        ...formData,
        botField: botField.value,
        startTime: startTime.value,
      };

      console.log('Enviando datos del formulario:', formToSend);

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
      formData.name = '';
      formData.email = '';
      formData.company = '';
      formData.phone = '';
      formData.message = '';
      consentimiento.value = false;
      botField.value = ''; // Resetea el campo honeypot
      errorMessage.value = '';
      successMessage.value = '';
      showForm.value = true;
      startTime.value = ''; // Resetea el tiempo de inicio
    };

    onMounted(() => {
      startTime.value = new Date().getTime(); // Inicializa el tiempo de inicio al montar el componente
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
    };
  },
};
</script>

<style scoped>
/* Añade tus estilos aquí */
</style>
