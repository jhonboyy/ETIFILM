export default defineNuxtConfig({
  site: {
    url: 'https://etifilm.com',
  },

  ogImage: {
    enabled: false
  },

  robots: {
    enabled: true
  },

  seoExperiments: {
    enabled: true
  },

  schemaOrg: {
    enabled: true
  },

  linkChecker: {
    enabled: true
  },

  router: {
    options: {
      scrollBehaviorType: 'smooth',
    }
  },

  app: {
    head: {
      title: 'ETIFILM - Embalajes Industriales en Tenerife, Islas Canarias',
      htmlAttrs: {
        lang: 'es'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'ETIFILM - Expertos en embalajes industriales en Tenerife, Islas Canarias. Proporcionamos soluciones de embalaje seguras y eficientes para todas sus necesidades industriales.' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'keywords', content: 'ETIFILM, embalajes industriales, Tenerife, Islas Canarias, soluciones de embalaje, seguridad industrial, film, precinto, big bag, productos de embalaje' },
        { name: 'author', content: 'ETIFILM' },
        { property: 'og:title', content: 'ETIFILM - Embalajes Industriales en Tenerife, Islas Canarias' },
        { property: 'og:description', content: 'ETIFILM - Expertos en embalajes industriales en Tenerife, Islas Canarias. Proporcionamos soluciones de embalaje seguras y eficientes para todas sus necesidades industriales.' },
        { property: 'og:url', content: 'https://etifilm.com' },
        { property: 'og:image', content: '/images/etifilm-favicon.svg' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:site', content: '@etifilm' },
        { name: 'twitter:title', content: 'ETIFILM - Embalajes Industriales en Tenerife, Islas Canarias' },
        { name: 'twitter:description', content: 'ETIFILM - Expertos en embalajes industriales en Tenerife, Islas Canarias. Proporcionamos soluciones de embalaje seguras y eficientes para todas sus necesidades industriales.' },
        { name: 'twitter:image', content: '/path/to/your/image.jpg' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/images/etifilm-favicon.svg' },
        { rel: 'canonical', href: 'https://etifilm.com' },
        { rel: 'preload', href: '/fonts/FFF-AcidGrotesk-Light-TRIAL', as:'font', type: 'font/woff2', crossorigin: 'anonymous'}

      ]
    }
  },

  css: [
    '~/assets/styles/styles.css'
  ],

  plugins: [

  ],

  components: true,
  modules: ["@nuxtjs/seo", "nuxt-schema-org", '@nuxtjs/sitemap', "@nuxtjs/robots"],

  sitemap: {
    hostname: 'https://etifilm.com',
    gzip: true,
    routes: [
      '/',
      '/privacidad',
    ]
  },

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
  },

  compatibilityDate: '2024-07-19'
});