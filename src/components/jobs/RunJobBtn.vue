<template>
  <div class="border">
    <q-card class="my-card">
      <q-card-section>
        <div class="text-h6">Create new Job</div>
        <div>Select a database from the list below and click <span class="text-bold">Create Job</span> to create a new database or replace an existing database</div>
      </q-card-section>
      <q-card-section>
        <q-select style="q-mb-md" v-model="databaseId" :options="databases" label="Select Database" filled />
        <q-btn :disable="!databaseId" class="q-mt-sm" size="sm" color="green" icon="play_arrow" label="Create Job" @click="runJobClick" />
      </q-card-section>
    </q-card>

  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  data: () => {
    return{
      databaseId: null,
      databases: []
    }
  },
  computed:{
    ...mapGetters('database', ['getDatabasesForSelect'])
  },
  methods:{
    ...mapActions('job', ['createJob']),
    runJobClick(){
      console.log(this.databaseId.value)
      this.createJob(this.databaseId.value)
    }
  },
  beforeMount(){
    this.databases = this.getDatabasesForSelect
  }
}
</script>

<style>

</style>
