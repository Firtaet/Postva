import tailwindcss from '@tailwindcss/vite'
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  vite: {
    plugins: [tailwindcss()],
  },
  modules: ['@nuxt/icon', '@nuxt/image', '@nuxt/content', '@nuxtjs/seo', '@nuxtjs/supabase', 'nuxt-toast', 'vue-sonner'],
  css: ['~/assets/css/main.css'],
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
    serviceKey: process.env.SUPABASE_SECRET_KEY,
    redirect: false
  },
  site: {
    url: 'https://www.postva.xyz',
    name: 'Postva',
    defaultLocale: 'en',
  },
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY,
    }
  },
  sitemap: {
    xsl: false,
    credits: false,
    minify: true,
    defaults: {
      changefreq: 'daily',
      priority: 0.8
    }
  },
  robots: {
    sitemap: [
      'https://www.postva.xyz/sitemap.xml'
    ]
  },
  app: {
    head: {
      title: 'Postva',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'apple-mobile-web-app-title', content: 'Postva' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon-96x96.png', sizes: '96x96' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'shortcut icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap' },
        { rel: 'manifest', href: '/site.webmanifest' }
      ],
      script: [
        {
          src: 'https://www.googletagmanager.com/gtag/js?id=G-3L808YDS6N',
          async: true
        },
        {
          innerHTML: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-3L808YDS6N');
          `
        }
      ]
    }
  },
  routeRules: {
    '/**': {
      headers: {
        'Content-Security-Policy': [
          "default-src 'self'",
          "font-src 'self' https: data: https://fonts.gstatic.com",
          "form-action 'self'",
          "frame-src 'self' https://oauth.telegram.org https://telegram.org",
          "frame-ancestors 'none'",
          "img-src 'self' https: data: blob: https://www.googletagmanager.com https://www.google-analytics.com",
          "manifest-src 'self'",
          "media-src 'self'",
          "object-src 'none'",
          "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://telegram.org https://oauth.telegram.org",
          "script-src-attr 'none'",
          "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
          "connect-src 'self' https: wss: https://www.google-analytics.com https://stats.g.doubleclick.net",
          "base-uri 'none'",
          "require-trusted-types-for 'script'",
        ].join('; '),
        'X-Frame-Options': 'DENY',
        'X-Content-Type-Options': 'nosniff',
        'Referrer-Policy': 'strict-origin-when-cross-origin',
        'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
        'Cross-Origin-Opener-Policy': 'same-origin',
        'Cross-Origin-Resource-Policy': 'same-origin',
        'Permissions-Policy': 'camera=(), microphone=(), geolocation=(), interest-cohort=()',
      }
    }
  }
})
