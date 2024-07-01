export default defineNuxtConfig({
  head: {
    title: 'ETIFILM',
    htmlAttrs: {
      lang: 'es'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Descripción de tu sitio' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  css: [
    '~/assets/styles/styles.css'
  ],
  plugins: [
    '~/plugins/google-recaptcha.ts'
  ],
  components: true,
  buildModules: [
    '@nuxt/typescript-build'
  ],
  modules: [

  ],
  build: {},
  runtimeConfig: {
    public: {
      recaptchaSiteKey: process.env.VUE_APP_RECAPTCHA_PUBLIC_KEY || '',
      mailRecipient: process.env.MAIL_RECIPIENT || ''
    },
    private: {
      recaptchaSecretKey: process.env.VUE_APP_RECAPTCHA_SECRET_KEY,
      gmailUser: process.env.GMAIL_USER,
      gmailPass: process.env.GMAIL_APP_PASS,
      mailhogHost: process.env.MAILHOG_HOST,
      mailhogPort: process.env.MAILHOG_PORT
    }
  }
});
