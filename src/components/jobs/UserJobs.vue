<template>
  <div>
    <div class="q-mb-sm">
      <RunJobBtn />
    </div>
    <div class="flex">
      <JobList @selected="jobSelected"/>
      <div class="q-ml-md">
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
