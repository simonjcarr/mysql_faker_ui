import Vue from "vue";
let vm = new Vue();
import { axios, setAuthHeader } from '../boot/axios'
export default {
  namespaced: true,
  state: {
    user: {},
    token: {}
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    },
    setUser(state, user) {
      state.user = user;
    }
  },
  getters: {
    getUser(state) {
      return state.user;
    },
    getToken(state) {
      let token = null
      try{
        token = state.token.token;
      }catch(err){}
      return token
    }
  },
  actions: {
    register({ commit }, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post("/user/register", {
            ...payload
          })
          .then(({ data }) => {
            // commit("setToken", data.token);
            // commit("setUser", data.user);
            // setAuthHeader(data.token.token)
            console.log("I am here")
            vm.$q.notify({type: 'positive', message: 'A new account has been created. You can now login'})
            return resolve();
          })
          .catch(err => {
            err.response.data.map(error => {
              vm.$q.notify({
                type: "negative",
                message: error.message
              });
            });
            reject("Error logging in");
          });
      });
    },
    login({ commit }, payload) {
      axios
        .post("/user/login", {
          ...payload
        })
        .then(({ data }) => {
          commit("setToken", data.token);
          commit("setUser", data.user);
          setAuthHeader(data.token.token)
        })
        .catch(err => {
          vm.$q.notify({
            type: "negative",
            message: "Unable to login with that username and password"
          });
        });
    },
    logout({ commit, dispatch }) {
      commit("setToken", null);
      commit("setUser", null);
      dispatch('database/clearDatabases', {}, {root:true})
      // dispatch('clearState', {})
      setAuthHeader(null)
      // vm.router.go("/")
    }
  }
};
