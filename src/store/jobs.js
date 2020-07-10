import _ from 'lodash'
export default {
  namespaced: true,
  state:{
    jobs: null
  },
  getters:{
    getJobLogs(state){
      return (job_id) => state.jobs.logs.filter(log => {
        return log.job_id == job_id
      })
    }
  },
  mutations: {
    createJob(state, job){
      if(!state.jobs){
        state.jobs = {}
      }
      try{
        this._vm.$set(state.jobs, `job_${job.job.id}`)
        state.jobs[`job_${job.job.id}`] = {
          job_id: job.job.id,
          status: "queue",
          logs: [],
          created_at: job.job.created_at,
          database_name: job.database.database_name,
          database_id: job.database.id,
          current_table: ''
        }
        state.jobs = state.jobs
      }catch(err){}
    },
    setMessage(state, message) {
      try{
        if(this.state.user.user.id !== message.user_id){
          //This message is not for our user
          return
        }
        state.jobs[`job_${message.job_id}`].logs.push(message)
        //If status is already at error don't overwrite it
        if(state.jobs[`job_${message.job_id}`].status !== 'error') {
          state.jobs[`job_${message.job_id}`].status = message.status
        }
        state.jobs[`job_${message.job_id}`].current_table = message.table
        if(message.status == 'complete'){
          this._vm.$q.notify({type:'positive', message: `Job Completed for database ${message.database_name}`})
          this._vm.$axios.put(`/database/status/${message.database_id}`, {
            status: 'Built'
          }).then(()=>{})
        }
        if(message.status == 'error'){
          this._vm.$q.notify({type: 'negative', message: `Job ended in error for databse ${message.database_name}`})
        }
      }catch(err){}

    },
    flushJobs(state) {
      state.jobs = null
    }
  },
  actions:{
    createJob({ commit, rootState, state }, databaseId){
      let runningJobs = _.filter(state.jobs, (o) => {
        return o.status == 'running' && o.database_id == databaseId
      })
      console.log(runningJobs)
      if(runningJobs.length > 0) {
        this._vm.$q.notify({type: 'warning', message: 'A job is already running for this database. Please wait for it to complete.'})
        return false
      }

      this._vm.$axios.post(`/job`, {
        database_id: databaseId,
        user_id: rootState.database.activeDatabase.user_id
      }).then(({ data }) => {
        commit('createJob', data)
      })
    },
    flushJobs({ commit }) {
      commit('flushJobs')
    }
  }
}
