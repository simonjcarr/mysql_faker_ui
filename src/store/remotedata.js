import jobs from "./jobs"
import _ from 'lodash'
export default {
  namespaced: true,
  state:{
    remotes: [],
    mappings: [],
    selectedRemote: null,
    tables: [],
    selectedTable: null,
    tableSchema: [],
    tableIndexes: []
  },
  getters:{
    getSelectedRemote(state){
      return _.filter(state.remotes, remote => {return remote.id == state.selectedRemote})[0]
    }
  },
  mutations: {
    setRemotes(state, remotes){
      state.remotes = remotes
    },
    setTables(state, tables){
      state.tables = tables
    },
    clearSelected(state){
      state.selectedRemote = null,
      state.selectedTable = null
      state.tables = []
    },
    setSelectedRemote(state, remote_id){
      state.selectedRemote = remote_id
    },
    setSelectedTable(state, table){
      state.selectedTable = table
    },
    setTableSchema(state, schema){
      state.tableSchema = schema
    },
    setTableIndexes(state, indexes){
      state.tableIndexes = indexes
    },
    clearMappings(state){
      state.mappings = []
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
    },
    getTables({ commit, state }){
      this._vm.$axios.get(`/remote/tables/${state.selectedRemote}`).then(({ data }) => {
        commit('setTables', data)
      }).catch((err) => {
        console.log(`Error: ${err}`)
      })
    },

    getTableSchema({ commit, state }){
      this._vm.$axios.get(`/remote/table/schema/${state.selectedRemote}/${state.selectedTable}`).then(({ data }) => {
        commit('setTableSchema', _.sortBy(data.schema, (o)=>{return o.COLUMN_NAME}))
        commit('setTableIndexes', data.indexes)
      })
    }
  }
}
