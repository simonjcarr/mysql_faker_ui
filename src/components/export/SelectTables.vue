<template>
  <div>
    <div class="text-primary text-h6 q-mb-sm">Table selector</div>
    <div class="q-mb-sm">Configure a table for export</div>
    <q-card dense class="bg-red-1 q-mb-sm" v-if="errors.length > 0">
      <q-card-section>
        <div class="text-red-7 text-bold">Please fix the errors listed below</div>
      </q-card-section>
      <q-card-section dense v-for="(error, index) in errors" :key="index">
        <div class="text-red-5">{{error}}</div>
      </q-card-section>
    </q-card>
    <form @submit.prevent="addTableOutput">
      <div class="row">
        <div class="col-2 q-mr-sm">
          <q-select :rules="[val => !!val || 'Select a table']"  dense v-model="tableExport.tbl_id" :options="tableOptions" label="Select Table" filled />
        </div>
        <div class="col-3 q-mr-sm">
          <q-select :rules="[val => !!val || 'Select export type']" dense v-model="tableExport.format" :options="outputOptions" label="Export Type" filled />
        </div>
        <div class="col-3 q-mr-sm">
          <q-input :rules="[val => !!val || 'Provide a filename to export into']" dense v-model="tableExport.file_name" type="text" label="Filename" />
        </div>
        <div class="col-1 q-mr-sm">
          <q-toggle  v-model="tableExport.active" color="green" label="Active" />
        </div>
        <div class="col-2">
          <q-btn dense color="primary" :icon="edit?'save':'add'" :label="edit?'Save Changes':'Add'" type="submit" />
          <q-btn v-if="edit" class="q-ml-sm" dense color="primary" icon="clear" label="Cancel" @click="cancelClick" />
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data: () => {
    return{
      tableOptions: [],
      outputOptions: [
        {value: 'csv', label: 'CSV'},
        {value: 'xml', label: 'XML'},
        {label: 'SQL Inserts (MySQL)', value: 'mysql'},
        {label: 'SQL Inserts (MSSQL)', value: 'mssql'}
      ],
      selectedTable: null,
      selectedOutput: null,
      selectedFileName: null,
      tableExport: {
        database_id: null,
        tbl_id: null,
        sql: null,
        format: null,
        template: null,
        file_name: null,
        active: true
      },
      errors: []

    }
  },
  watch:{
    tables(storeTables){
      this.tableOptions = []
      if(storeTables.length == 0){
        console.log("No Data")
        this.options = []
      }else{
        storeTables.map((tbl) => {
          this.tableOptions.push({value: tbl.id, label: tbl.table_name})
          console.log(tbl)
        })
      }
    },
    "tableExport.tbl_id"(value){
      try{
        this.tableExport.file_name = value.label + "." + this.tableExport.format.label.toLowerCase()
      }catch(err){}
    },
    "tableExport.format"(value){
      try{
        this.tableExport.file_name = this.tableExport.tbl_id.label + "." + value.label.toLowerCase()
      }catch(err){}
    },
    database_id(value){
      this.getTables(value)
    },
    edit(row){
      this.tableExport.tbl_id = {value: row.tbl_id, label: row.table.table_name}
      this.tableExport.format = row.format
      this.tableExport.file_name = row.file_name
      this.tableExport.active = row.active==1?true:false
    }
  },
  props:{
    database_id: {
      required: true,
      type: Number
    },
    edit: {
      required: false,
      type: Object,
      default: null
    }
  },
  computed:{
    ...mapState('data_export', ['tables'])
  },
  methods:{
    ...mapActions('data_export', ['getTables', 'createTableOutput']),
    addTableOutput() {
      this.errors = []
      if(!this.tableExport.tbl_id){
        this.errors.push("You have not selected a table")
      }
      if(!this.tableExport.format){
        this.errors.push("You have not selected an export option")
      }
      if(!this.tableExport.file_name){
        this.errors.push("You have not provided a filename")
      }
      if(this.errors.length > 0){
        this.$q.notify({type:'negative', message: 'Please fix errors and try adding the field again'})
        return
      }
      this.createTableOutput({
        database_id: this.database_id,
        tbl_id: this.tableExport.tbl_id.value,
        format: this.tableExport.format.value,
        active: this.tableExport.active,
        file_name: this.tableExport.file_name,
        template: this.tableExport.template,
        sql: this.tableExport.sql,
        edit: this.edit
      })
      this.edit = null
      this.tableExport.tbl_id = null
      this.tableExport.format = null
      this.tableExport.file_name = null
      this.tableExport.active = true
    },
    cancelClick(){
      this.$q.dialog({
        title: 'Confirm cancel edit',
        message: 'Are you sure you want to cancel the edit? You will loose any changes you have made',
        cancel: true
      }).onOk(()=>{
        this.edit = null
        this.tableExport.file_name = ''
        this.tableExport.tbl_id = null
        this.tableExport.format = null
        this.tabelExport.active = true
      })
    }
  },
  mounted() {
    this.getTables(this.database_id)
    this.tableExport.database_id = this.database_id
  }
}
</script>

<style>

</style>
