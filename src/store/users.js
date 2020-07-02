import Vue from 'vue'
let vm = new Vue()
import { LocalStorage } from 'quasar'
export default {
  namespaced: true,
  state: {
    user: {},
    token: {}
  },
  mutations: {
    setToken(state, token) {
      state.token = token
    },
    setUser(state, user) {
      state.user = user
    }
  },
  getters:{
    getUser(state) {
      return state.user
    },
    getToken(state) {
      return state.token
    }
  },
  actions: {
    register({ commit }, payload) {
      return new Promise((resolve, reject) => {
        vm.$axios.post('/user/register', {
          ...payload
        }).then(({ data }) => {
          commit('setToken', data.token)
          commit('setUser', data.user)
          resolve()
        }).catch((err) => {
          err.response.data.map((error) => {
            vm.$q.notify({
              type: 'negative',
              message: error.message
            })
          })
          reject('Error logging in')
        })
      })
    },
    login({ commit }, payload) {
      return new Promise((resolve, reject) => {
        vm.$axios.post('/user/login', {
          ...payload
        }).then(({ data }) => {
          commit('setToken', data.token)
          commit('setUser', data.user)
          LocalStorage.set('token', data.token)
          LocalStorage.set('user', data.user)
          return resolve()
        }).catch((err) => {
          vm.$q.notify({
            type: 'negative',
            message: 'Unable to login with that username and password'
          })
          return reject('Unable to login')
        })
      })
    },
    logout({ commit }) {
      commit('setToken', null)
      commit('setUser', null)
      LocalStorage.set('token', null)
      LocalStorage.set('user', null)
    }
  }
}
