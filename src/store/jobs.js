export default {
  namespaced: true,
  state:{
    jobs: null
  },
  getters:{
    getJobLogs(state){
      return job_id => state.jobs.logs.filter(log => {
        return log.job_id == job_id
      })
    }
  },
  mutations: {
    createJob(state, job){
      if(!state.jobs){
        state.jobs = {}
      }
      this._vm.$set(state.jobs, `job_${job.id}`)
      state.jobs[`job_${job.id}`] = {
        job_id: job.id,
        status: "queue",
        logs: [],
        created_at: job.created_at
      }
      state.jobs = state.jobs
    },
    setMessage(state, message) {
      if(this.state.user.user.id !== message.user_id){
        //This message is not for our user
        return
      }
      state.jobs[`job_${message.job_id}`].logs.push(message)
      //If status is already at error don't overwrite it
      if(state.jobs[`job_${message.job_id}`].status !== 'error') {
        state.jobs[`job_${message.job_id}`].status = message.status
      }
      console.log(state.jobs[`job_${message.job_id}`])

    },
    flushJobs(state) {
      state.jobs = null
    }
  },
  actions:{
    createJob({ commit, rootState, state }){
      this._vm.$axios.post(`/job`, {
        database_id: rootState.database.activeDatabase.id,
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
