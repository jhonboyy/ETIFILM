import { defineNuxtPlugin, useRuntimeConfig } from '#app';

export default defineNuxtPlugin(nuxtApp => {
  const config = useRuntimeConfig().public.recaptcha;

  if (!config || !config.siteKey) {
    console.error('reCAPTCHA siteKey is not defined');
    return;
  }

  const loadReCaptchaScript = () => {
    return new Promise((resolve, reject) => {
      if (document.querySelector(`script[src="https://www.google.com/recaptcha/api.js?render=${config.siteKey}"]`)) {
        return resolve();
      }

      const script = document.createElement('script');
      script.src = `https://www.google.com/recaptcha/api.js?render=${config.siteKey}`;
      script.async = true;
      script.defer = true;
      script.onload = () => resolve(window.grecaptcha);
      script.onerror = reject;
      document.head.appendChild(script);
    });
  };

  nuxtApp.provide('recaptcha', {
    init: loadReCaptchaScript,
  });
});
