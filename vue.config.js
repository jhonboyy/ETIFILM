module.exports = {
  outputDir: 'dist',
  chainWebpack: config => {
    // Asegurarse de que las definiciones existan antes de intentar modificarlas
    config.plugin('define').tap(args => {
      let env = args[0]['process.env'] || {}; // Inicializa 'env' si no existe
      env.__VUE_OPTIONS_API__ = JSON.stringify(true);
      env.__VUE_PROD_DEVTOOLS__ = JSON.stringify(false);
      env.__VUE_PROD_HYDRATION_MISMATCH_DETAILS__ = JSON.stringify(true);
      env.VUE_APP_RECAPTCHA_PUBLIC_KEY = JSON.stringify(process.env.VUE_APP_RECAPTCHA_PUBLIC_KEY);

      args[0]['process.env'] = env;
      return args;
    });
  },
  configureWebpack: {
    optimization: {
      splitChunks: {
        chunks: 'all'
      },
      minimize: true
    }
  },
  pwa: {
    name: 'Etifilm App',
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    manifestOptions: {
      background_color: '#FFFFFF'
    }
  },
  productionSourceMap: false,
  pluginOptions: {
    // Aquí puedes agregar opciones adicionales para otros plugins que uses
  }
}
