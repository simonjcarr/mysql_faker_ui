<template>
  <div>
    <q-card class="my-card">

      <q-card-section>
        <div class="text-h6">Job Status:
          <q-spinner-bars
          class="q-mx-sm"
          color="primary"
          size="1em"
          v-if="job.status=='running'"
        />
           <span :class="{'text-black':job.status=='queue', 'text-blue':job.status=='running', 'text-green':job.status=='complete', 'text-red': job.status=='error'}">{{job.status}}</span>
        </div>
      </q-card-section>
      <q-card-section>
        <q-list bordered separator>
          <q-item v-for="(log, index) in logs" :key="index" :class="{'bg-red text-white':log.status=='error', 'bg-green-1 text-green-10':log.status!='error'}" class="q-pa-sm text-body2">
            <q-item-section >
              <div class="" v-if="log.status !== 'complete'">
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
import { mapGetters, mapState } from 'vuex'
export default {
  data: () => {
    return {
      logs:[]
    }
  },
  computed:{
    ...mapGetters('job'['getJobLogs']),
    ...mapState('job', ['jobs'])
  },
  props:{
    job:{
      required: true
    }
  },
  watch:{
    job(jobs){

      try{
        this.logs = this.job.logs
      }catch(err){
        this.logs = []
      }
    },
    jobs(jobs){
      this.logs = []
      if(!jobs){
        this.logs = []
      }
    }

  },
  mounted() {
    try{
      this.logs = this.job.logs
    }catch(err){
      this.logs = []
    }

  }
}
</script>

<style>

</style>
