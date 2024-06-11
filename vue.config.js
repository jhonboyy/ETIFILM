module.exports = {
  chainWebpack: config => {
    config.plugin('define').tap(definitions => {
      // Asegúrate de no sobrescribir todo el objeto process.env
      Object.assign(definitions[0]['process.env'], {
        __VUE_OPTIONS_API__: JSON.stringify(true),
        __VUE_PROD_DEVTOOLS__: JSON.stringify(false),
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(true),
        // Asegúrate de incluir manualmente las variables que necesitas, si no aparecen automáticamente
        VUE_APP_RECAPTCHA_PUBLIC_KEY: JSON.stringify(process.env.VUE_APP_RECAPTCHA_PUBLIC_KEY),
      });
      return definitions;
    });
  },
  configureWebpack: {
    optimization: {
      minimize: true
    }
  }
}
