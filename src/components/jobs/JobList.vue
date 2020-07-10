<template>
  <q-card class="my-card">
    <q-card-section>
      <div class="text-h6">Job List</div>
      <div>Select a job to view detailed logs</div>
      <div class="flex">
        <q-btn size="sm" color="primary" icon="play_arrow" label="Create Job" @click="runJobClick" />
        <q-btn size="sm" class="q-ml-sm" color="red" icon="delete" label="Flush Jobs" @click="flushJobsClick" />
      </div>
    </q-card-section>
    <q-card-section>
      <q-list v-if="jobs" bordered="" separator>
        <q-item :active="activeJobLog == job.job_id" active-class="bg-blue-1" clickable v-ripple v-for="(job, index) in getDatabaseJobs" :key="index" @click="jobClick(job)">
          <q-item-section>
            <div :class="{'text-black':job.status=='queue', 'text-blue':job.status=='running', 'text-green':job.status=='complete', 'text-red':job.status=='error'}" >
              {{job.created_at}} - [{{job.status}}]
            </div>
            <div>
              <div><span class="text-secondary">Database: </span> <span class="text-primary">{{job.database_name}}</span></div>
              <div v-if="job.status !== 'complete'">Current Table: <span class="text-primary">{{job.current_table}}</span></div>
            </div>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card-section>
  </q-card>
</template>

<script>
import { mapState, mapActions} from 'vuex'
import _ from 'lodash'
import { QDialog } from 'quasar'

export default {
  data: () => {
    return {
      activeJobLog: null
    }
  },
  computed:{
    ...mapState('job', ['jobs']),
    ...mapState('database', ['activeDatabase']),
    getDatabaseJobs(){
      return _.filter(this.jobs, (o) => {return o.database_id == this.activeDatabase.id})
    }
  },
  methods:{
    ...mapActions('job', ['flushJobs', 'createJob']),
    runJobClick(){
      this.$q.dialog({
        title: 'Confirm run job',
        message: 'Please confirm you want to run this job',
        cancel: true
      }).onOk(()=>{
        this.createJob(this.activeDatabase.id)
      })
    },
    jobClick(job) {
      this.$emit('selected', job)
      this.activeJobLog = job.job_id
    },
    flushJobsClick(){
      this.$q.dialog({
        title: 'Confirm Flush',
        message: 'Are you sure you want to flush all Job Logs?',
        cancel: true,
        persistent: true
      }).onOk(()=>{
        this.flushJobs()
      })

    }
  }
}
</script>

<style>

</style>
