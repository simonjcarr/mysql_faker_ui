<template>
  <div>
    <q-card class="my-card">
      <q-card-section>
        <div class="row">
          <div class="col-2">
            <q-input outlined dense v-model="localTableName" type="text" label="Local Table Name" hint="Name of local table to create" />
          </div>
          <div class="col-2 q-ml-sm">
            <q-input outlined dense v-model="fakeQty" type="text" label="Fake qty" hint="Enter a quantiy or a control command" />
          </div>
        </div>

      </q-card-section>
      <q-card-section v-if="showMappings">

        <div class="row">
          <div class="text-bold text-primary col-1">Include</div>
          <div class="text-bold text-primary col-2">Remote Field Name</div>
          <div class="text-bold text-primary col-1">Remote Type</div>
          <div class="text-bold text-primary col-1">Remote Size</div>
          <div class="text-bold text-primary col-2">Local Field Name</div>
          <div class="text-bold text-primary col-1">Local Type</div>
          <div class="text-bold text-primary col-1">Local Size</div>
          <div class="text-bold text-primary col-3">Local Indexs</div>
        </div>

        <div class="q-py-sm"  v-for="(field, index) in getTableSchema" :key="index">
          <FieldMappingCol @changed="colChanged" :row="field" />
        </div>
      </q-card-section>
      <q-card-section>
        <div v-if="mappingCount == 0" class="text-red">Please create a mapping before saving</div>
        <div v-if="hasErrors" class="text-red">{{errorCount}} fields have errors. Please fix before you can save</div>
        <q-btn :disable="hasErrors || mappingCount == 0" color="primary" icon="check" label="Save" @click="saveMappingsclick" />
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import FieldMappingCol from './FieldMappingCol'
import { mapState, mapMutations, mapActions } from 'vuex'
import _ from 'lodash'

export default {
  data: () => {
    return{
      showMappings: false,
      fieldMappings: {},
      localTableName: '',
      fakeQty: '',
      dataTypes: [
        'CHAR',
        'VARCHAR',
        'TINYTEXT',
        'BLOB',
        'MEDIUMTEXT',
        'MEDIUMBLOB',
        'LONGTEXT',
        'LONGBLOB',
        'TINYINT',
        'SMALLINT',
        'MEDIUMINT',
        'INT',
        'BIGINT',
        'FLOAT',
        'DOUBLE',
        'DECIMAL',
        'DATE',
        'DATETIME',
        'TIMESTAMP',
        'TIME',
        'BOOLEAN'
        ],
      fieldFilter: "",
      hasErrors: false,
      errorCount: 0,
      mappingCount: 0
    }
  },
  components:{
    FieldMappingCol
  },
  computed:{
    ...mapState('remotedata', ['mappings', 'tableSchema', 'selectedTable']),
    ...mapState('database', ['activeDatabase']),
    getTableSchema: function() {
      if(this.fieldFilter == "") {
        return this.tableSchema
      }else{
        return _.filter(this.tableSchema, (col) => {
          return col.COLUMN_NAME.indexOf(this.fieldFilter) !== -1
        })
      }
    }
  },
  methods:{
    ...mapMutations('remotedata', ['clearMappings']),
    ...mapActions('table', ['createTable', 'addField', 'addFieldCommand']),
    colChanged(data) {
      this.fieldMappings[data.remoteCol.COLUMN_NAME] = data.localCol
      this.fieldMappings[data.remoteCol.COLUMN_NAME]['error'] = data.error

      if(data.localCol.enabled == false){
        delete this.fieldMappings[data.remoteCol.COLUMN_NAME]
      }
      this.mappingCount = Object.keys(this.fieldMappings).length
      let errors = _.filter(this.fieldMappings, o => {
        return o.error == true
      })
      if(errors.length > 0){
        this.hasErrors = true
        this.errorCount = errors.length
      }else{
        this.errorCount = 0
        this.hasErrors = false
      }
    },
    saveMappingsclick(){
      //Save Table
      this.createTable({
        table_name: this.localTableName,
        fake_qty: this.fakeQty,
        table_comments: '',
        database_id: this.activeDatabase.id
      }).then((table)=>{
        console.log(this.fieldMappings)
        _.forEach(this.fieldMappings, (field)=>{
          this.addField( {
            name: field.fieldName,
            data_type: field.dataType,
            size: field.size,
            auto_increment: field.ai,
            nullable: field.nullable,
            primary_key: field.pk,
            idx: field.index,
            description: '',
            id: table.id,
            tbl_id: table.id
          }).then((f) => {
            if(field.fakeCommand){
              this.addFieldCommand({
                field_id: f.id,
                command: field.fakeCommand,
                percent: field.percent
              })
            }
          })
        })
      })
    }
  },
  watch:{
    tableSchema(value){
      this.showMappings = true
    }
  }
}
</script>

<style lang="scss">
  .table-row{
    border-bottom-width: 1px;
    border-bottom-color: $accent;
    border-bottom-style: dashed;
  }
</style>
