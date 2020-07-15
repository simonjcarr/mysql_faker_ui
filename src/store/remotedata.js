import jobs from "./jobs"

export default {
  namespaced: true,
  state:{
    remotes: []
  },
  mutations: {
    setRemotes(state, remotes){
      state.remotes = remotes
    }
  },
  actions:{
    saveRemote({ dispatch }, remote) {
      return new Promise((resolve, reject) => {
        this._vm.$axios.post('/remote', {
          dbtype: remote.dbtype,
          hostname: remote.hostname,
          port: remote.port,
          username: remote.username,
          password: remote.password,
          database: remote.database,
          name: remote.name
        }).then(({ data }) => {
          dispatch('getRemotes')
          this._vm.$q.notify({'type': 'positive', 'message': 'Remote database connection saved'})
          return resolve()
        }).catch((err)=>{
          this._vm.$q.notify({'type': 'negative', 'message': 'Error saving remote database connection: ' + err})
          return reject()
        })
      })
    },
    getRemotes({ commit }) {
      this._vm.$axios.get('/remote').then(({ data }) => {
        commit('setRemotes', data)
      })
    },
    testConnection({commit}, remote){
      return new Promise((resolve, reject) => {
        this._vm.$axios.post('/remote/connection/test', {
          ...remote
        }).then(({ data }) => {
          return resolve(data)
        }).catch((err) => {
          console.log(err.response.data)
          return reject({
            result: 'failed',
            message: err.response.data.originalError.message
          })
        })
      })
    }
  }
}
