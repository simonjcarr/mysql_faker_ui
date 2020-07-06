<template>
  <q-page>
    <div v-if="activeDatabase">
      <q-card class="my-card">
        <q-card-section class="flex bg-accent text-secondary">
          <AddTableBtn class="q-mb-sm" :create="true" />
          <q-btn class="q-mb-sm q-ml-md" v-if="selected.length > 0" size="sm" dense color="red" icon="delete" label="Delete selected" @click="deleteSelected" />
        </q-card-section>
        <q-card-section class="bg-accent text-secondary">
          <q-table
            title="Tables"
            :data="activeDatabase.tables"
            :columns="columns"
            row-key="id"
            @row-click="onRowClick"
            selection="multiple"
            :selected.sync="selected"
            :filter="filter"

          />
        </q-card-section>
      </q-card>


    </div>
  </q-page>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import AddTableBtn from './EditTableBtn'
export default {
  data: () => {
    return {
      selected: [],
      columns: [
        { name: 'table_name', label: 'Table Name', field: row => row.table_name, sortable: true},
        { name: 'field_count', label: 'Field Count', field: row=> row.fields.length, sortable: true}
      ],
      selectedRow: {},
      filter: ''
    }
  },
  components:{
    AddTableBtn
  },
  computed:{
    ...mapState('database', ['activeDatabase'])
  },
  methods: {
    ...mapMutations('table', ['setActiveTable']),
    ...mapActions('table', ['deleteTables']),
    ...mapActions('database', ['getDatabases', 'setActiveDatabase']),
    onRowClick(evt, row) {
      this.setActiveTable(row)
    },
    deleteSelected() {
      this.$q.dialog({
        title: 'Confirm Delete',
        message: `Are you sure you want to delete ${this.selected.length} tables`,
        cancel: true,
        persistent: true
      }).onOk(() => {
        console.log(this.selected)
        this.deleteTables(this.selected).then(()=>{
          this.getDatabases().then(()=>{
            this.setActiveDatabase(this.activeDatabase.id)
          })
          this.selected = []
        })
      })
    }
  }
}
</script>

<style>

</style>
