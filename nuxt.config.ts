import eslintPlugin from 'vite-plugin-eslint';
import svgLoader from 'vite-svg-loader';

export default defineNuxtConfig({
  app: {
    head: {
      title: 'Wildbags - Ręcznie wykonane torebki i kosmetyczki z upcyclingu.',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          hid: 'description',
          name: 'description',
          content: 'ODKRYJ Z WILDBAGS ABSOLUTNIE NIEPOSPOLITY ŚWIAT UPCYCLINGU I NOŚ SIĘ WYJĄTKOWO!',
        },
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          // crossorigin: true,
        },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Amatic+SC:wght@400;700&display=swap',
        },
        { rel: 'icon', type: 'image/png', href: '/favicon.png' },
      ],
    },
  },
  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    },
  },
  build: {
    transpile: ['gsap, vue-agile'],
  },
  css: ['@/assets/scss/common/index.scss'],
  vite: {
    plugins: [eslintPlugin({ failOnError: false }), svgLoader()],
    build: {
      target: 'esnext',
      commonjsOptions: {
        transformMixedEsModules: true,
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "assets/scss/global/main.scss";',
        },
      },
    },
  },
});
