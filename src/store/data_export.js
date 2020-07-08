export default {
  namespaced: true,
  state:{
    tables: [],
    exports: []
  },
  mutations:{
    setTables(state, tables){
      state.tables = tables
    },
    setExports(state, exports) {
      state.exports = exports
    }
  },
  actions:{
    getTables({ commit }, database_id) {
      this._vm.$axios.get(`/table/${database_id}`).then(({ data }) => {
        commit('setTables', data)
      })
    },
    getExports({ commit }, database_id) {
      this._vm.$axios.get(`/export/${database_id}`).then(({ data }) => {
        commit('setExports', data)
      })
    },
    createTableOutput({ commit, dispatch }, payload) {
      this._vm.$axios.post('/export', {
        database_id: payload.database_id,
        tbl_id: payload.tbl_id,
        format: payload.format,
        sql: payload.sql,
        file_name: payload.file_name,
        template: payload.template,
        active: payload.active
      }).then(({ data }) => {
        dispatch('getExports', payload.database_id)
      })
    }
  }
}
