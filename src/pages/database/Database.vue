<template>
  <div class="bg-secondary">
    <div class="">
    <q-tabs
        v-model="tab"
        class="text-accent bg-secondary"
        v-if="getToken"
      >
        <q-tab name="database" icon="source" label="Database Settigs" />
        <q-tab name="settings" icon="settings" label="Table Settigs" />
        <q-tab name="json" icon="text_snippet" label="JSON Output" />
        <q-tab name="jobs" icon="queue_play_next" label="Jobs" />
        <q-tab name="data" icon="cloud_download" label="Data Export" />
      </q-tabs>
    </div>
    <div class="q-ml-lg">
      <DatabaseStatusBar />
    </div>

      <q-tab-panels v-model="tab" animated class="bg-secondary" v-if="getToken">
        <q-tab-panel name="database">
         <DatabaseSettings/>
        </q-tab-panel>
        <q-tab-panel name="settings">
         <Settings/>
        </q-tab-panel>
        <q-tab-panel name="json">
          <JSONPreview />
        </q-tab-panel>
        <q-tab-panel name="jobs">
          <JobDashboard />
        </q-tab-panel>
        <q-tab-panel name="data">
          <ExportDashboard />
        </q-tab-panel>
      </q-tab-panels>
  </div>
</template>

<script>
import DatabaseSettings from '../../components/database/DatabaseSettings'
import Settings from '../../components/Settings'
import JSONPreview from '../../components/JSONPreview'
import JobDashboard from '../../components/jobs/JobDashboard'
import ExportDashboard from '../../components/export/exportDashboard'
import DatabaseStatusBar from '../../components/database/DatabaseStatusBar'
import { mapGetters } from 'vuex'
export default {
  data: () => {
    return {
      tab: 'database'
    }
  },
  components: {
    DatabaseSettings,
    Settings,
    JSONPreview,
    JobDashboard,
    ExportDashboard,
    DatabaseStatusBar
  },
  computed:{
    ...mapGetters('user', ['getToken'])
  },
  mounted() {
    if(!this.getToken){
      this.$router.push('/')
    }
  }
}
</script>

<style>

</style>
