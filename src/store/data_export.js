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
      if(payload.edit){
        this._vm.$axios.put(`/export/${payload.edit.id}`, {
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
      }else{
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
    },
    deleteExports({ commit, dispatch }, rows) {
      try{
        var database_id = rows[0].database_id
      }catch(err){
        this._vm.$q.notify({type:'negative', message:'Error deleting exports'})
        return
      }
      rows.map(row => {
        this._vm.$axios.delete(`/export/${row.id}`).then(({ data }) => {
          this._vm.$q.notify({type:'positive', message:'Export deleted'})
          dispatch('getExports', database_id)
        }).catch((err)=>{
          this._vm.$q.notify({type:'negaive', message:'Error deleting exports: ' + err})
        })
      })
    }
  }
}
