<template>
  <div>
    <q-card class="bg-accent">
      <q-card-section>
        <q-card>
          <q-card-section class="text-primary text-h6">
            <span class="text-accent">Database Settings </span> <span class="text-bold text-primary">{{activeDatabase.database_name}}</span>
          </q-card-section>
          <q-card-section>
            <q-input v-model="databaseName" type="text" label="Database name" />
            <q-btn class="q-mt-sm" color="primary" icon="check" label="Save" @click="saveSettingsClick" />
          </q-card-section>
          <q-card-section class="text-right">
            <q-btn size="sm" class="text-red" color="yellow" icon="delete" label="Delete Database" @click="deleteDatabaseClick" />
          </q-card-section>
        </q-card>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { mapState, mapActions} from 'vuex'
export default {
  data: () => {
    return {
      databaseName: ''
    }
  },
  watch:{
    activeDatabase(db){
      this.databaseName = db.database_name
    }
  },
  computed: {
    ...mapState('database', ['activeDatabase'])
  },
  methods:{
    ...mapActions('database', ['deleteActiveDatabase', 'saveActiveDatabaseSettings']),
    saveSettingsClick(){
      this.saveActiveDatabaseSettings({
        database_name: this.databaseName
      })
    },
    deleteDatabaseClick(){
      this.$q.dialog({
        title: 'Confirm Delete',
        message: `Are you sure you want to delete database ${this.activeDatabase.database_name}`,
        cancel: true,
        persistent: true
      }).onOk(() => {
        this.deleteActiveDatabase()
        this.$router.push('/')
      })
    }
  },
  mounted() {
    this.databaseName = this.activeDatabase.database_name
  }
}
</script>

<style>

</style>
