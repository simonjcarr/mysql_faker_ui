<template>
  <div>
    <q-card class="my-card" v-if="job">
      <q-card-section>
        <div class="text-h6">Job Log</div>
      </q-card-section>
      <q-card-section>
        <div class="text-h6">Status:
          <q-spinner-bars
          class="q-mx-sm"
          color="primary"
          size="1em"
          v-if="job.status=='running'"
        />
           <span :class="{'text-black':job.status=='queue', 'text-blue':job.status=='running', 'text-green':job.status=='complete', 'text-red': job.status=='error'}">{{job.status}}</span></div>
      </q-card-section>
      <q-card-section>
        <q-list bordered>
          <q-item clickable v-ripple v-for="(log, index) in job.logs" :key="index">

            <q-item-section :class="{'bg-red text-white':log.status=='error', 'bg-green-3 text-green-10':log.status!='error'}" class="q-pa-sm text-body2">
              <div class="flex">
                <span class="text-bold q-mr-md">D: {{log.database_name}}</span> <span class="text-bold">T: {{log.table}}</span>
              </div>
              {{log.message}}
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data: () => {
    return {}
  },
  computed:{
    ...mapGetters('job'['getJobLogs'])
  },
  props:{
    job:{
      required: true
    }
  },
  mounted() {
    if(this.job){
      this.getJobLogs(this.job.jobId)
    }
  }
}
</script>

<style>

</style>
