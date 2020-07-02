import Vue from 'vue'
import axios from 'axios'

export default ({ store }) => {
  var token = store.state.user.token
try {
  var jwt = token.token
}catch(err){
  var jwt = null
}
axios.defaults.baseURL = 'http://localhost:3333/api/v1/'

axios.interceptors.request.use((config) => {
  config.headers = {'Authorization': `Bearer ${jwt}`}
  return config
})
Vue.prototype.$axios = axios
}








