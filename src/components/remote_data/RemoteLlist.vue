<template>
  <div>
    <q-table
      title="Database Connections"
      :data="remotes"
      :columns="columns"
      row-key="name"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data: () => {
    return{
      columns:[
        { label: "Name", data: 'name', sortable: true},
        { label: 'Host', data: 'hostname', sortable: true},
        { label: 'Username', data: 'username', sortable: true}
      ]
    }
  },
  computed: {
    ...mapState('remotedata', ['remotes'])
  }
}
</script>

<style>

</style>
