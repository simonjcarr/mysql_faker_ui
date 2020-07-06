<template>
  <div>
    <q-btn size="sm" color="green" icon="play_arrow" label="Create Job" @click="runJobClick" />
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data: () => {
    return{}
  },
  methods:{
    ...mapActions('job', ['createJob']),
    runJobClick(){
      this.createJob()
    }
  }
}
</script>

<style>

</style>
