<template>
  <div style="min-width: 500px;">
      <q-form
        @submit="onSubmit"
        class="q-gutter-md"
      >
        <div>
          <q-select dense v-model="remote.dbtype" :options="dbdrivers" label="Driver" filled />
        </div>

        <div>
          <q-input dense v-model="remote.hostname" type="text" label="Host / IP Address" />
        </div>

        <div>
          <q-input dense v-model="remote.port" type="number" label="Port" />
        </div>

        <div>
          <q-input dense v-model="remote.username" type="text" label="Username" />
        </div>

        <div>
          <q-input dense v-model="remote.password" type="password" label="Password" />
        </div>

        <div>
          <q-input dense v-model="remote.database" type="text" label="Database" />
        </div>

        <div>
          <q-input dense v-model="remote.name" type="text" label="Name this connection" />
        </div>

        <div>
          Connection Status: <span class="text-accent">{{getTestResult}}</span>
        </div>

        <div>
          <q-btn size="sm" color="secondary" icon="settings_remote" label="Test Connecton" @click="testConnectionClick" />
          <div class="q-mt-md">
            <q-btn :disabled="testResult.result !== 'connected'" size="sm" label="Save Connection" type="submit" color="primary"/>
          </div>
        </div>
      </q-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data: () => {
    return {

        showAddForm: false,
        remote: {
          dbtype: '',
          username: '',
          password: '',
          hostname: '',
          port: null,
          database: '',
          name: ''
        },
        dbdrivers: [
          {value: 'mysql', label: 'MySQL', port: 3306},
          {value: 'mssql', label: 'Microsoft SQL Server', port: 1433}
        ],
        testResult: false
    }
  },
  watch: {
    "remote.dbtype"(value) {
      this.remote.port = value.port
    }
  },
  computed:{
    getTestResult() {
      if(this.testResult) {
        if(this.testResult.result == 'connected'){
          return "Connected"
        }
        if(this.testResult.result == 'failed'){
          return "Connection Failed: " + this.testResult.error
        }
      }
      return "Not Tested"
    }
  },
  methods:{
    ...mapActions('remotedata', ['testConnection']),
    testConnectionClick(){
      this.testConnection(this.remote).then((result) => {
        this.testResult = result
      })
    }
  }
}
</script>

<style>

</style>
