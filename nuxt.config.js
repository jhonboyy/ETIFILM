import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      site: {
        url: 'https://example.com'
      },
      recaptchaSiteKey: process.env.VUE_APP_RECAPTCHA_PUBLIC_KEY || '',
      mailRecipient: process.env.MAIL_RECIPIENT || '',
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
        enabled: false
      },
    },
    private: {
      recaptchaSecretKey: process.env.VUE_APP_RECAPTCHA_SECRET_KEY,
      gmailUser: process.env.GMAIL_USER,
      gmailPass: process.env.GMAIL_APP_PASS,
      mailhogHost: process.env.MAILHOG_HOST,
      mailhogPort: process.env.MAILHOG_PORT
    }
  },

  router: {
    options: {
      scrollBehavior(to, from, savedPosition) {
        return { top: 0, behavior: 'smooth' };
      }
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
        // ... rest of your meta tags
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/images/etifilm-favicon.svg' },
        // ... rest of your link tags
      ]
    }
  },

  css: [
    '~/assets/styles/styles.css'
  ],

  components: true,

  modules: [
    '@nuxtjs/seo',
    'nuxt-schema-org',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots'
  ],

  sitemap: {
    hostname: 'https://etifilm.com',
    gzip: true,
    routes: [
      '/',
      '/privacidad',
    ]
  },

  experimental: {
    asyncEntry: true,
  },

  compatibilityDate: '2024-07-19'
})
