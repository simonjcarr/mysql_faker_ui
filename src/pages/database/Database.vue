<template>
  <div class="bg-secondary">
    <q-tabs
        v-model="tab"
        class="text-accent bg-secondary"

      >
        <q-tab name="settings" icon="settings" label="Table Settigs" />
        <q-tab name="json" icon="text_snippet" label="JSON Output" />
        <q-tab name="jobs" icon="queue_play_next" label="Jobs" />
        <q-tab name="data" icon="cloud_download" label="Data Export" />
      </q-tabs>

      <q-tab-panels v-model="tab" animated class="bg-secondary">
        <q-tab-panel name="settings">
         <Settings/>
        </q-tab-panel>
        <q-tab-panel name="json">
          <JSONPreview />
        </q-tab-panel>
        <q-tab-panel name="jobs">
          <q-card class="my-card">
            <q-card-section>
              <div class="text-h5">Manage Jobs</div>
              <div>Use this screen to start new jobs and monitor job logs.</div>
            </q-card-section>
            <q-card-section>
              <JobDashboard />
            </q-card-section>
          </q-card>
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
