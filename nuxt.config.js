import { defineNuxtConfig } from 'nuxt/config'

export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      site: {
        url: 'https://etifilm.com'
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
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'ETIFILM ofrece soluciones de embalajes industriales en Tenerife, Islas Canarias. Especialistas en calidad y servicio.' },
        { name: 'keywords', content: 'embalajes industriales, Tenerife, Islas Canarias, embalaje, empaquetado, logística, fleje, film, precinto, cordel' },
        { name: 'author', content: 'ETIFILM' },
        
        // Open Graph (OG) meta tags para mejorar en redes sociales
        { property: 'og:title', content: 'ETIFILM - Embalajes Industriales en Tenerife, Islas Canarias' },
        { property: 'og:description', content: 'Soluciones de embalajes industriales en Tenerife, con calidad y servicio excepcionales.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://etifilm.com' },
        { property: 'og:image', content: 'https://etifilm.com/images/og-image.jpg' },
  
        // Twitter Card meta tags
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'ETIFILM - Embalajes Industriales en Tenerife' },
        { name: 'twitter:description', content: 'Soluciones de embalajes industriales con calidad y servicio excepcionales en Islas Canarias.' },
        { name: 'twitter:image', content: 'https://etifilm.com/images/og-image.jpg' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/images/etifilm-favicon.svg' },
      ],
      link: [
        {
          rel: 'preload',
          href: '/fonts/FFF-AcidGrotesk-Light.woff2',
          as: 'font',
          type: 'font/woff2',
          crossorigin: 'anonymous'
        }
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
