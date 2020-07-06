<template>
  <div>
    <div class="q-mb-sm row">
      <div class="col-11">
        <q-card class="bg-accent">
          <q-card-section>
            <RunJobBtn />
          </q-card-section>
        </q-card>

      </div>
    </div>
    <div class="row">
      <div class="col-3">
        <q-card class="bg-accent">
          <q-card-section>
            <JobList @selected="jobSelected"/>
          </q-card-section>
        </q-card>
      </div>
      <div class="q-ml-md col-8">
        <q-card class="bg-accent" v-if="selected">
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
import RunJobBtn from './RunJobBtn'
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
    RunJobBtn,
    JobList,
    JobLog
  },
  methods:{
    jobSelected(job){
      this.selected = job
    }
  }
}
</script>

<style>

</style>
