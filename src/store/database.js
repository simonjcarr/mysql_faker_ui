const Promise = require('bluebird')
export default {

  namespaced: true,
  state: {
    databases: [],
    activeDatabase: null
  },
  getters:{
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
    }
  },

  actions: {
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
    deleteDatabases(databases) {
      databases.map((db) => {
        this.$axios.delete(`/database/${db.id}`).then((response)=>{

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
    }
  }
}
