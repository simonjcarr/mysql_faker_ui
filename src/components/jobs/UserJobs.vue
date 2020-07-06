<template>
  <div>
    <div class="q-mb-sm row">
      <div class="col-11">
        <RunJobBtn />
      </div>
    </div>
    <div class="row">
      <div class="col-3">
        <JobList @selected="jobSelected"/>
      </div>
      <div class="q-ml-md col-8">
        <JobLog :job="selected" />
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
