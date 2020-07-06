export default {
  namespaced: true,
  state: {
    logs:[]
  },
  getters:{
    getDatabseLogs(database_id){

    }
  },
  mutations:{
    addLog(state, log){
      state.logs.append(log)
    }
  },
  actions: {
    polForLogs({ commit, rootState }){
      
      this._vm.$axios('/job/log/')
    }
  }
}
