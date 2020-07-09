<template>
  <div class="border">
    <q-card class="my-card">

      <q-card-section>
        <q-btn class="q-mt-sm" size="sm" color="primary" icon="play_arrow" label="Create Job" @click="runJobClick" />
      </q-card-section>
    </q-card>

  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'
export default {
  data: () => {
    return{
      databaseId: null,
      databases: []
    }
  },
  computed:{
    ...mapGetters('database', ['getDatabasesForSelect']),
    ...mapState('database', ['activeDatabase'])
  },
  methods:{
    ...mapActions('job', ['createJob']),
    runJobClick(){
      this.createJob(this.activeDatabase.id)
    }
  },
  beforeMount(){
    this.databases = this.getDatabasesForSelect
  }
}
</script>

<style>

</style>
