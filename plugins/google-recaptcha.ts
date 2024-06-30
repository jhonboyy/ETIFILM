import { VueReCaptcha } from 'vue-recaptcha-v3';

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();
  const siteKey = config.public.recaptchaSiteKey;

  if (!siteKey) {
    throw new Error('VUE_APP_RECAPTCHA_PUBLIC_KEY no está definida');
  }

  nuxtApp.vueApp.use(VueReCaptcha, {
    siteKey,
    loaderOptions: {
      autoHideBadge: true,
      explicitRenderParameters: {
        badge: 'bottomleft',
      },
    },
  });
});
