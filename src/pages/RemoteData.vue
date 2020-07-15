<template>
  <q-page class="q-ma-lg">
    <AddRemoteBtn class="q-mb-sm" />
    <q-card class="bg-accent">
      <q-card-section>
        <RemoteList />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import AddRemoteBtn from '../components/remote_data/AddRemoteBtn.vue'
import RemoteList from '../components/remote_data/RemoteLlist'
export default {
  data: () => {
    return {}
  },
  components:{
    AddRemoteBtn,
    RemoteList
  }
}
</script>

<style>

</style>
