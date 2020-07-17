const Promise = require('bluebird')
export default {
  namespaced: true,
  state: {
    database_id: '',
    activeTable: null
  },
  mutations: {
    setDatabases(state, data) {
      state.databases = data
    },
    setActiveTable(state, data) {
      state.activeTable = data
    }
  },
  actions: {
    createTable({dispatch}, tableData){
      return new Promise((resolve, reject) => {
        this._vm.$axios.post(`/table`, {
          ...tableData
        }).then(({ data })=>{
          this._vm.$q.notify({type: 'positive', message: 'Table has been created'})
          dispatch('database/getDatabases', {},{root:true})
          return resolve(data)
        }).catch((err)=>{
          this._vm.$q.notify({type: 'negative', message: 'There was an error creating the table: ' + err.response})
          return reject()
        })
      })
    },
    updateTable({state, dispatch}, tableData){
      this._vm.$axios.put(`/table/${state.activeTable.id}`, {
        ...tableData
      }).then((response)=>{
        this._vm.$q.notify({type: 'positive', message: 'Table has been saved'})
        dispatch('database/getDatabases', {},{root:true})
      }).catch((err)=>{
        this._vm.$q.notify({type:'negative', message: 'There was an error saving the table: ' + err})
      })
    },
    updateActiveTable({ rootState, commit, state, dispatch }) {

      let activeDatabase = rootState.database.activeDatabase
      try{
        if(state.activeTable.id){
          activeDatabase.tables.map((table) => {
            if(table.id == state.activeTable.id){
              commit('setActiveTable', table)
            }
          })
        }
      }catch(err){}


    },
    deleteTables({ commit, state }, tables) {
      return new Promise((resolve, reject) => {
        Promise.map(tables,async (table) => {
          try {
            await this._vm.$axios.delete(`/table/${table.id}`)
            try{
              if(table.id == state.activeTable.id ) {
                commit('setActiveTable', null)
              }
              this._vm.$q.notify({type:'positive', message: `Table ${table.table_name} deleted`})
            }catch(err){}
          }catch(err) {
            this._vm.$q.notify({type: 'negative', message: `Unable to delete table ${table.table_name}`})
          }
        }).then(()=>{
          return resolve()
        }).catch(()=>{
          return reject('Error deleting one or more tables')
        })
      })
    },


    updateField({ dispatch }, field){
      console.log("In the store")
      this._vm.$axios.put(`/field/${field.id}`, {
        ...field
      }).then(()=>{
        this._vm.$q.notify({type:'positive', message: 'Field updated'})
        dispatch('database/getDatabases', {},{root:true})
      }).catch(()=>{})
    },

    addField({ dispatch }, field){
      return new Promise((resolve, reject) => {
        this._vm.$axios.post('/field', {
          ...field
        }).then(({ data })=>{
          this._vm.$q.notify({type:'positive', message: 'Field created'})
          dispatch('database/getDatabases', {},{root:true})
          return resolve(data)
        }).catch((err)=>{
          this._vm.$q.notify({type:'negative', message: 'Error creating field: ' + err})
          return reject(err)
        })
      })
    },

    updateFakeQty({ dispatch, state }, command) {
      this._vm.$axios.put(`/table/fake_qty/${state.activeTable.id}`, {
        fake_qty: command
      }).then(()=>{
        dispatch('database/getDatabases', {}, {root: true})
        dispatch('updateActiveTable')
        this._vm.$q.notify({type: 'positive', message: 'Fake Qty command updated'})
      }).catch((err) => {
        this._vm.$q.notify({type:'negative', message: 'Error updating Fake Qty'})
      })
    },

    addFieldCommand({ dispatch, state }, payload) {
      //Payload should be object  {fieldID: 1, command: 'command', percent: 0.5}
      return new Promise((resolve, reject) =>{
        this._vm.$axios.post('/field/fake_command', {
          field_id: payload.field_id,
          command: payload.command,
          percent: payload.percent
        }).then(()=>{
          dispatch('database/getDatabases', {}, {root: true})
          this._vm.$q.notify({type:'positive', message: 'Command saved'})
          return resolve()
        }).catch((err) => {
          this._vm.$q.notify({type:'negative', message: 'Error saving command'})
          return reject(err)
        })
      })
    },

    updateFieldCommand({}, payload) {
      //Payload should be object  {fieldID: 1, command: 'command', percent: 0.5}
      return new Promise((resolve, reject) =>{
        this._vm.$axios.put(`/field/fake_command/${payload.command_id}`, {
          command: payload.command,
          percent: payload.percent
        }).then(()=>{
          this._vm.$q.notify({type:'positive', message: 'Command saved'})
          return resolve()
        }).catch((err) => {
          this._vm.$q.notify({type:'negative', message: 'Error saving command'})
          return reject(err)
        })
      })
    },

    getFieldCommands({},field_id){
      return new Promise((resolve, reject) => {
        this._vm.$axios.get('/field/fake_command/' + field_id).then(({ data }) => {
          return resolve(data)
        })
      })
    },

    deleteFields({ dispatch }, fields) {
      return new Promise((resolve, reject) => {
        Promise.map(fields, (field) => {
          this._vm.$axios.delete(`/field/${field.id}`)
          .then(({ data })=>{
            dispatch('database/getDatabases', {}, {root:true})
            this._vm.$q.notify({type:'positive', message: `Field ${field.name} has been deleted`})
            return resolve(data)
          })
          .catch((err)=>{
            this._vm.$q.notify({type:'negative', message: `Error deleting field ${field.name}`})
            return reject(err)
          })
        })
      })
    },

    deleteCommands({}, commands) {
      return new Promise((resolve, reject) => {
        Promise.map(commands, async (command) => {
          try{
            await this._vm.$axios.delete('/field/fake_command/' + command.id)
            this._vm.$q.notify({type:'positive', message:`Deleted command ${command.command}`})
          }catch(err){
            this._vm.$q.notify({type:'negaive', message:`Error deleting command ${command.command}`})
          }
        }).then(()=>{
          return resolve()
        }).catch((err)=>{
          return reject(err)
        })
      })
    }
  }
}
