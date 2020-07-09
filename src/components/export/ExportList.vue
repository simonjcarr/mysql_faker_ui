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
              :selected.sync="selected"
              selection="multiple"
              @row-click="onRowClick"
            >
            <template v-slot:top>
              <div class="flex">
                <div class="text-h6 text-bold">Exports</div>
                <div>
                  <q-btn class="q-ml-sm" dense size="sm" color="red" icon="delete" label="Delete Selected" @click="deleteSelected" />
                </div>
              </div>
            </template>
            </q-table>
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
      ],
      selected: []
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
    ...mapActions('data_export', ['getExports','deleteExports']),
    deleteSelected(rows){
      this.deleteExports(this.selected)
      this.selected = []
    },
    onRowClick(e, row){
      this.$emit('edit', row)
    }
  },
  mounted() {
    this.getExports(this.database_id)
  }
}
</script>

<style>

</style>
