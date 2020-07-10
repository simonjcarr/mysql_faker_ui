<template>
  <div class="text-accent text-h6 row">
    <div class="col-2">
      Status:
      <q-spinner-bars
          class="q-mx-sm"
          color="primary"
          size="1em"
          v-if="getDatabaseState=='Job Running'"
        />
      <span :class="{'text-yellow':getDatabaseState=='Job Running','text-green':activeDatabase.status=='complete', 'text-accent':!activeDatabase.status, 'text-red':activeDatabase.status=='error'}" class="text-bold">
        {{getDatabaseState}}
        </span>
    </div>
    <div class="col-2">
      Table Count: <span class="text-primary text-bold">{{activeDatabase.tables.length}}</span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import _ from 'lodash'
export default {
  data: () => {
    return{
      status: null
    }
  },
  computed:{
    ...mapState('database', ['activeDatabase']),
    ...mapState('job', ['jobs']),
    getDatabaseState() {
      let runningJobs = _.filter(this.jobs, job => {
        return job.database_id == this.activeDatabase.id && job.status == 'running'
      })
      if(runningJobs.length > 0){
        return "Job Running"
      }
      if(!this.activeDatabase.status){
        return "Not Built"
      }
      if(this.activeDatabase.status == 'complete'){
        return "Build Complete"
      }
      if(this.activeDatabase.status == 'error') {
        return "Build Error"
      }

      return "Unknown State"
    }
  }
}
</script>

<style>

</style>
