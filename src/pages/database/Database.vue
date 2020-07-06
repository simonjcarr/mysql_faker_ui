<template>
  <div>
    <q-tabs
        v-model="tab"
        class="text-teal"
      >
        <q-tab name="settings" icon="settings" label="Table Settigs" />
        <q-tab name="json" icon="text_snippet" label="JSON Output" />
        <q-tab name="jobs" icon="queue_play_next" label="Jobs" />
        <q-tab name="data" icon="cloud_download" label="Data Export" />
      </q-tabs>

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="settings">
         <Settings/>
        </q-tab-panel>
        <q-tab-panel name="json">
          <div class="text-h6">JSON</div>
          <JSONPreview />
        </q-tab-panel>
        <q-tab-panel name="jobs">
          <div class="text-h6">Jobs</div>
          <JobDashboard />
        </q-tab-panel>
        <q-tab-panel name="data">
          <div class="text-h6">Data</div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </q-tab-panel>
      </q-tab-panels>
  </div>
</template>

<script>
import Settings from '../../components/Settings'
import JSONPreview from '../../components/JSONPreview'
import JobDashboard from '../../components/jobs/JobDashboard'
export default {
  data: () => {
    return {
      tab: 'settings'
    }
  },
  components: {
    Settings,
    JSONPreview,
    JobDashboard
  }
}
</script>

<style>

</style>
