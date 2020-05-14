import 'font-awesome/css/font-awesome.min.css'
import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'fa4', // use fa-<icon-name> mdi-<icon-name>
  },
  // blue-grey == '#607d8a'
  theme: {
    themes: {
      light: {
        primary: '#F83F37',
        secondary: '#fc4b6c',
      },
      dark:{
        primary: '#607d8a',
        secondary: '#fc4b6c',
      }
    }
  }
})