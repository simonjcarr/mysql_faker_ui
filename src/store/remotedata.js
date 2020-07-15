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
      })
    },
    getRemotes({ commit }) {
      this._vm.$axios.get('/remote').then(({ data }) => {
        commit('setRemotes', data)
      })
    },
    testConnection(remote){
      return new Promise((resolve, reject) => {
        this._vm.$axios.post('/remote/connection/test', {
          ...remote
        }).then(({ data }) => {
          return resolve(data)
        }).catch((err) => {
          return reject(err)
        })
      })
    }
  }
}
