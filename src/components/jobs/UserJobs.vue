<template>
  <div>
    <div class="row">
      <div class="col-3">
        <q-card class="bg-accent">
          <q-card-section>
            <JobList @selected="jobSelected"/>
          </q-card-section>
        </q-card>
      </div>
      <div class="q-ml-md col-8">
        <q-card class="bg-accent" v-if="jobs && selected">
          <q-card-section>
            <JobLog :job="selected" />
          </q-card-section>
        </q-card>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'
import JobList from './JobList'
import JobLog from './JobLog'
export default {
  data: () => {
    return {
      selected: null
    }
  },
  computed:{
    ...mapState('user', ['user']),
    ...mapState('job', ['jobs']),
    ...mapGetters('job', ['getJobLogs'])
  },
  mounted() {

  },
  components:{
    JobList,
    JobLog
  },
  methods:{
    jobSelected(job){

      this.selected = null
      setTimeout(()=>{
        this.selected = job
      }, 200)
    }
  }
}
</script>

<style>

</style>
