<template>
  <q-page class="q-ma-lg">
    <AddRemoteBtn class="q-mb-sm" />
    <q-card class="bg-accent">
      <q-card-section>
        <RemoteList />
      </q-card-section>

      <q-card-section>
        <div class="text-primary text-h6" v-if="getSelectedRemote"><span class="text-secondary">Connection in use: </span>{{getSelectedRemote.name}}</div>
        <SelectRemoteTable v-if="selectedRemote" />
      </q-card-section>

      <q-card-section>
        <FieldMappings v-if="selectedTable" />
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import AddRemoteBtn from '../components/remote_data/AddRemoteBtn.vue'
import RemoteList from '../components/remote_data/RemoteLlist'
import SelectRemoteTable from '../components/remote_data/SelectRemoteTable'
import FieldMappings from '../components/remote_data/FieldMapping'
import { mapState, mapGetters, mapActions } from 'vuex'
export default {
  data: () => {
    return {}
  },
  computed:{
    ...mapState('remotedata', ['selectedRemote', 'selectedTable']),
    ...mapGetters('remotedata', ['getSelectedRemote'])
  },
  components:{
    AddRemoteBtn,
    RemoteList,
    SelectRemoteTable,
    FieldMappings
  },
  methods:{

  }
}
</script>

<style>

</style>
