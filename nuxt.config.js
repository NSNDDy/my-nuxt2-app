
export default {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      // Bootstrap CSS
      { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css' },
      // Bootstrap Icons
      { rel: 'stylesheet', href: '/assets/vendor/bootstrap-icons/bootstrap-icons.css' },
      // AOS
      { rel: 'stylesheet', href: '/assets/vendor/aos/aos.css' },
      // Glightbox
      { rel: 'stylesheet', href: '/assets/vendor/glightbox/css/glightbox.min.css' },
      // Swiper
      { rel: 'stylesheet', href: '/assets/vendor/swiper/swiper-bundle.min.css' },
      // Main CSS
      { rel: 'stylesheet', href: '/assets/css/main.css' },
      // Google Fonts
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap' },
      // Favicon
      { rel: 'icon', type: 'image/png', href: '/assets/img/favicon.png' },
      { rel: 'apple-touch-icon', href: '/assets/img/apple-touch-icon.png' },
      { rel: 'stylesheet', href: '/css/style.css' }
      
      
    ],
    script: [
      {
        src: 'https://kit.fontawesome.com/f895e990f6.js',
        crossorigin: 'anonymous'
      }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://bootstrap-vue.js.org
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios'
  ],
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  },

  server: {
    port: 4000,
    host: 'localhost'
  },

   axios: {
    proxy: true
  },
  proxy: {
    '/auth/': {
      target: 'http://localhost:8080',
      changeOrigin: true
    },

    '/api-login': {
      target: 'http://localhost:8080',
      changeOrigin: true
    }
  }
}
