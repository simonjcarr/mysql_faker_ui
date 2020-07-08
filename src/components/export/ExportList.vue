<template>
  <div>
    <q-card class="bg-accent">
      <q-card-section>
        <q-card class="my-card">
          <q-card-section>
            <q-table
              dense=""
              title="Exports"
              :data="exports"
              :columns="columns"
              row-key="id"
            />
          </q-card-section>
        </q-card>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data: () =>{
    return {
      columns:[
        { name: 'source', label: 'Source', field: row => row.tbl_id?'Table':'SQL', sortable: true},
        { name: 'source_value', label: 'Table / SQL', field: row => row.tbl_id?row.table.table_name:row.sql, sortable: true},
        { name: 'format', label: 'Format', field: 'format', sortable: true},
        { name: 'filename', label: 'Filename', field: 'file_name', sortable: true},
        { name: 'active', label: 'Active', field: row => row.active?'True':'False', sortable: true}
      ]
    }
  },
  props:{
    database_id: {
      required: true,
      type: Number
    }
  },
  watch:{
    database_id(value){
      this.getExports(value)
    }
  },
  computed:{
    ...mapState('data_export', ['exports'])
  },
  methods:{
    ...mapActions('data_export', ['getExports'])
  },
  mounted() {
    this.getExports(this.database_id)
  }
}
</script>

<style>

</style>
