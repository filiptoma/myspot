/*
** TailwindCSS Configuration File
**
** Docs: https://tailwindcss.com/docs/configuration
** Default: https://github.com/tailwindcss/tailwindcss/blob/master/stubs/defaultConfig.stub.js
*/
module.exports = {
    theme: {
      screens: {
        'little': '320px',
        'mobile': '375px',
        'landscape': '425px',
        'tablet': '768px',
        'laptop': '1024px',
        'desktop': '1440px'
      },
      extend: {
        colors: {
          'theme': '#963c61',
          'bordercol': '#cccccc',
          'primary': '#545454',
          'secondary': '#808080',
          'uinput': '#ededed',
          'divide': '#e6e6e6',
        }
      }
    },
    variants: {},
    plugins: []
  }
  