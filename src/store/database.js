const Promise = require('bluebird')
export default {

  namespaced: true,
  state: {
    databases: [],
    activeDatabase: null
  },
  getters:{
    getActiveDatabase(state) {
      return state.activeDatabase
    },
    getActiveTables() {
      return activeDatabase.tables
    },
    getDatabasesForSelect(state) {
      return state.databases.map((db)=>{
        return {
          label: db.database_name,
          value: db.id
        }
      })
    },
    getDatabaseList(state) {
      return state.databases
    },
    getDatabase(state) {
      return db_id => state.databases.filter(db => {
        if(db.id == db_id) {
          return db
        }
      })
    },
    getDatabaseTables(state) {
      return db_id => state.databases.map(db => {
        if(db.id == db_id) {
          return db.tables
        }
      })
    },
    getDatabaseTableNames(state){
      return db_id => state.databases.map(db => {
        if(db.id == db_id) {
          return db.tables.map(table => {
            return table.table_name
          })
        }
      })
    }
  },
  mutations: {
    setDatabases(state, data) {
      state.databases = data
    },
    setActiveDatabase(state, data) {
      state.activeDatabase = data
    },
    clearDatabases(state) {
      state.databases = null
      state.databases = []
      state.activeDatabase = null
    },
    setDatabaseStatusFromMessage(state, message){
      if(message.database_id == state.activeDatabase.id){
        state.activeDatabase.status = message.status
      }
      state.databases.map((db, index)=>{
        if(db.id == message.database_id){
          state.databases[index].status = message.status
        }
      })
    }
  },

  actions: {
    setStatusFromMessage({ commit }, message) {
      this._vm.$axios.put(`/database/status/${message.database_id}`, {
        status: message.status
      }).then(()=>{
        commit('setDatabaseStatusFromMessage', message)
      })
    },
    clearDatabases({commit}){
      commit('clearDatabases')
    },
    getDatabases({ commit, state, dispatch, rootState }) {
      if(!rootState.user.token){
        return
      }
      return new Promise((resolve, reject) => {
        this._vm.$axios.get('/database').then((response) => {1
          Promise.map(response.data, (db) => {
            commit('setDatabases', response.data)
            try{
              if(state.activeDatabase.id){
                dispatch('setActiveDatabase', state.activeDatabase.id)
                dispatch('table/updateActiveTable', {}, {root:true})
              }
            }catch(err){}
          }).then(()=>{
            return resolve()
          }).catch((err)=>{
            return reject(err)
          })
        })
      })
    },
    setActiveDatabase({ commit, state, dispatch }, database_id) {
      state.databases.filter((db) => {
          if(db.id == database_id) {
            commit('setActiveDatabase', db)
            return db
          }
      })
    },
    deleteActiveDatabase({state, commit, dispatch}){
      this._vm.$axios.delete(`/database/${state.activeDatabase.id}`).then((response)=>{
        this._vm.$q.notify({type:'positive', message: 'Database ' + state.activeDatabase.database_name + ' has been deleted'})
        commit('setActiveDatabase', null)
        dispatch("getDatabases")
      }).catch((err)=>{
        this._vm.$q.notify({type:'negative', message: 'Error deleting database ' + state.activeDatabase.database_name})
      })
    },
    deleteDatabases(databases) {
      databases.map((db) => {
        this._vm.$axios.delete(`/database/${db.id}`).then((response)=>{
          this._vm.$q.notify({type:'positive', message: 'Database ' + db.database_name + ' has been deleted'})
        }).catch((err)=>{
          this._vm.$q.notify({type:'negative', message: 'Error deleting database ' + db.database_name})
        })
      })
    },
    createDatabase({dispatch}, databaseName) {

      return new Promise((resolve, reject) => {

        this._vm.$axios.post('/database', {
          name: databaseName,
          drop: true,
          project_name: 'BAE Fake Data'
        }).then(()=>{

          this._vm.$q.notify({type: 'positive', message: 'Database Created'})
          dispatch('getDatabases')
          return resolve()
        }).catch((err) => {
          this._vm.$q.notify({type: 'negative', message: 'Error creating database'})
          return reject()
        })
      })
    },
    saveActiveDatabaseSettings({ state, dispatch, commit }, settings){
      this._vm.$axios.put(`/database/${state.activeDatabase.id}`, {
        database_name: settings.database_name
      }).then(({data}) => {
        dispatch('getDatabases')
        this._vm.$q.notify({type: 'positive', message: 'Database settings saved'})
      }).catch((err) => {
        this._vm.$q.notify({type: 'negative', message: `Error saving database settings: ${err}`})
      })
    }
  }
}
