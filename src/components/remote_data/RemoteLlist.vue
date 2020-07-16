<template>
  <div>
    <q-table
      title="Database Connections"
      :data="remotes"
      :columns="columns"
      row-key="name"
      dense
    >
    <template v-slot:body-cell-use="props">
      <q-td :props="props">
        <div class="flex">
          <q-btn class="q-ml-sm" size="sm" color="primary" label="Use" @click="useDB(props.row)" />
        </div>
      </q-td>
    </template>
    </q-table>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
export default {
  data: () => {
    return{
      columns:[
        { name: 'use', label: '', field: ''},
        { name: 'name', label: "Name", field: 'name', sortable: true},
        { name: 'host', label: 'Host', field: 'hostname', sortable: true},
        { name: 'database', label: 'Database', field: 'database', sortable: true},
        { name: 'username', label: 'Username', field: 'username', sortable: true}
      ]
    }
  },
  computed: {
    ...mapState('remotedata', ['remotes'])
  },
  methods:{
    ...mapActions('remotedata', ['getTables']),
    ...mapMutations('remotedata', ['clearSelected', 'setSelectedRemote']),
    useDB(row){
      this.setSelectedRemote(row.id)
      this.getTables(row.id)
    }
  },
  mounted() {
    this.clearSelected()
  }
}
</script>

<style>

</style>
