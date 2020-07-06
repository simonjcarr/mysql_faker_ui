<template>
  <div>
    <q-card class="my-card">
      <q-card-section class="flex bg-accent text-secondary">
        <EditTableBtn v-if="activeTable" class="q-mb-sm"  :table="activeTable" label="Edit Table" />
        <AddFieldBtn class="q-ml-sm"/>
      </q-card-section>
      <q-card-section class=" bg-accent text-secondary">

        <div v-if="activeTable">
        <q-table
          :title="'Fields for Table: ' + activeTable.table_name"
          :data="activeTable.fields"
          :columns="columns"
          row-key="name"
          selection="multiple"
          :selected.sync="selected"
          :filter="filter"
          @row-click="rowClick"
          virtual-scroll
          :pagination.sync="pagination"
          :rows-per-page-options="[0]"
          style="height: 400px"
          class="sticky-header-table"
        >
        <template v-slot:top>
          <div class="text-h5">Fields</div>
          <div class="q-ml-sm">
            <q-btn v-if="selected.length > 0" color="red" size="sm" icon="delete" label="Delete Selected" @click="deleteSelected" />
          </div>
        </template>
        </q-table>
        <q-dialog v-model="showEditFieldDialog" persistent>
          <q-card>
            <q-card-section class="row items-center">
              <FakeCommandEditor @updated="commandsUpdated" :field="editField"/>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn flat label="Cancel" color="primary" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </div>
      </q-card-section>
    </q-card>
    <div class="flex">

    </div>

  </div>
</template>

<script>
import EditTableBtn from '../tables/EditTableBtn'
import AddFieldBtn from '../fields/AddFieldBtn'
import FakeCommandEditor from '../fields/FakeCommandEditor'
import { mapState, mapActions } from 'vuex'
export default {
  data: () => {
    return {
      tableData: null,
      fieldData: null,
      columns: [
        { name: 'field_name', label: 'Field', field: row => row.name, sortable: true},
        { name: 'data_type', label: 'Type', field: row=> row.data_type, sortable: false},
        { name: 'size', label: 'Size', field: row=> row.size, sortable: false},
        { name: 'AI', label: 'AI', field: row=> row.auto_increment==1?'true':'false', sortable: false},
        { name: 'nullable', label: 'Null', field: row=> row.nullable==1?'true':'false', sortable: false},
        { name: 'PK', label: 'PK', field: row=> row.primary_key==1?'true':'false', sortable: false},
        { name: 'cmdCount', label: 'Cmd Count', field: row=> row.commands.length, sortable: false},
      ],
      filter: '',
      selected: [],
      colLabels: ['Field', 'Type', 'Size', 'AI', 'Nullable', 'PK'],
      editField: {},
      showEditFieldDialog: false,
      pagination: {
        rowsPerPage: 0
      }
    }
  },
  computed:{
    ...mapState('table', ['activeTable'])
  },
  components:{
    EditTableBtn,
    AddFieldBtn,
    FakeCommandEditor
  },
  methods:{
    ...mapActions('database', ['getDatabases']),
    ...mapActions('table', ['deleteFields']),
    rowClick(e, row) {
      this.editField = row
      this.showEditFieldDialog = true
    },
    commandsUpdated(){
      this.getDatabases()
    },
    deleteSelected() {
      this.deleteFields(this.selected)
    }
  }
}
</script>

<style>

</style>
