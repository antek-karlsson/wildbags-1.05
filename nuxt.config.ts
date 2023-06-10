import eslintPlugin from 'vite-plugin-eslint';
import svgLoader from 'vite-svg-loader';
import UnpluginComponentsVite from 'unplugin-vue-components/vite';
import IconsResolver from 'unplugin-icons/resolver';

export default defineNuxtConfig({
  app: {
    head: {
      title: 'Wildbags | Ręcznie wykonane torebki i kosmetyczki z upcyclingu.',
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
          href: 'https://fonts.googleapis.com/css2?family=Amatic+SC:wght@400;700&family=Lato:wght@300;700&display=swap',
        },
        { rel: 'icon', type: 'image/png', href: '/favicon.ico' },
      ],
    },
  },
  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL,
      firebaseApiKey: process.env.NUXT_PUBLIC_FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.NUXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
      firebaseProjectId: process.env.NUXT_PUBLIC_FIREBASE_PROJECT_ID,
      firebaseStorageBucket: process.env.NUXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
      firebaseMessagingSenderId: process.env.NUXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
      firebaseAppId: process.env.NUXT_PUBLIC_FIREBASE_APP_ID,
      emailjsServiceId: process.env.EMAILJS_SERVICE_ID,
      emailjsContactTemplateId: process.env.EMAILJS_CONTACT_TEMPLATE_ID,
      emailjsOrderTemplateId: process.env.EMAILJS_ORDER_TEMPLATE_ID,
      emailjsApiKey: process.env.EMAILJS_API_KEY,
    },
  },
  components: [
    {
      path: '~/components/',
      pathPrefix: false,
    },
  ],
  modules: [
    'unplugin-icons/nuxt',
    '@vueuse/nuxt',
    'nuxt-swiper',
    '@pinia-plugin-persistedstate/nuxt',
    ['@pinia/nuxt', { autoImports: ['defineStore'] }],
  ],
  build: {
    transpile: ['gsap'],
  },
  css: ['@/assets/scss/common/index.scss'],
  vite: {
    plugins: [
      eslintPlugin({ failOnError: false }),
      svgLoader(),
      UnpluginComponentsVite({
        dts: true,
        resolvers: [
          IconsResolver({
            prefix: 'Icon',
          }),
        ],
      }),
    ],
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
    optimizeDeps: {
      exclude: ['@nuxt/kit'],
    },
  },
  imports: {
    dirs: ['composables/**'],
  },
});
