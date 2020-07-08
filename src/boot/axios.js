import Vue from 'vue'
import axios from 'axios'

export default ({ store }) => {

axios.defaults.baseURL = 'http://localhost:3333/api/v1/'
const token = store.getters['user/getToken']

if(token){
  setAuthHeader(token)
}
Vue.prototype.$axios = axios
}

export const setAuthHeader = token => {
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export { axios }








