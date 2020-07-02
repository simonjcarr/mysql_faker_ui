<template>
  <div>
    <q-btn size="sm" color="primary" dense icon="edit" :label="create?'New Table':'Edit Table'" @click="showTableForm" />
    <q-dialog v-model="formVisible" persistent>
      <q-card>
        <q-card-section class="row items-center" style="min-width: 400px">
          <span v-if="!create" class="q-ml-sm text-h6">Edit Table: {{activeTable.table_name}}</span>
          <span v-if="create" class="q-ml-sm text-h6">Add Table</span>
        </q-card-section>
        <q-card-section>
          <TableForm :create='create' @close="closeDialog" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import TableForm from './TableForm'
export default {
  data: () => {
    return {
      formVisible: false
    }
  },
  components:{
    TableForm
  },
  computed:{
    ...mapState('table', ['activeTable'])
  },
  props: {
     create: {
      required: false,
      default: false,
      type: Boolean
    }
  },
  methods:{
    showTableForm(){
      this.formVisible = true
    },
    closeDialog(){
      this.formVisible= false
    }
  }
}
</script>

<style>

</style>
