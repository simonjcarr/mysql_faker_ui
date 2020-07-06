<template>
  <q-card class="my-card">
    <q-card-section>
      <div class="text-h6">Job List</div>
      <div>Select a job to view detailed logs</div>
      <div>
        <q-btn size="sm" color="red" icon="delete" label="Flush Jobs" @click="flushJobsClick" />
      </div>
    </q-card-section>
    <q-card-section>
      <q-list v-if="jobs" bordered="" separator>
        <q-item :active="activeJobLog == job.job_id" active-class="bg-blue-1" clickable v-ripple v-for="(job, index) in jobs" :key="index" @click="jobClick(job)">
          <q-item-section>
            <div :class="{'text-black':job.status=='queue', 'text-blue':job.status=='running', 'text-green':job.status=='complete', 'text-red':job.status=='error'}" >
              {{job.job_id}} - {{job.created_at}} - [{{job.status}}]
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
import { mapState, mapActions } from 'vuex'
import { QDialog } from 'quasar'

export default {
  data: () => {
    return {
      activeJobLog: null
    }
  },
  computed:{
    ...mapState('job', ['jobs'])
  },
  methods:{
    ...mapActions('job', ['flushJobs']),
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
