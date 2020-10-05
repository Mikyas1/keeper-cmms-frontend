import 'font-awesome/css/font-awesome.min.css'
import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'fa4', // use fa-<icon-name> mdi-<icon-name>
  },
  // blue-grey == '#607d8a'
  // denger-red == '#F83F37'
  // cool-green == '#3A800D'

  // material primaries
  // red == '#d32f2f'
  // pink == '#ec407a'
  // indigo == '#536dfe'
  // deepPurple == '#7c4dff'
  // cyan == '#00838f'
  // teal == '#00897b'
  // green == '#2e7d32'
  // lime == '#afb42b'
  // yellow == '#f9a825'
  // orange == '#e65100'
  // brown == '#4e342e'
  // grey == '#424242'


  theme: {
    themes: {
      light: {
        primary: '#00838f',
        secondary: '#3A800D',
      },
      dark:{
        primary: '#00838f',
        secondary: '#F83F37',
      }
    }
  }
})