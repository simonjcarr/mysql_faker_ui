<template>
  <div class=" row q-pa-sm rounded-borders" :class="{'error':error,'disabled':!settings.enabled, 'enabled': settings.enabled}">
    <div class="col-1">
      <q-toggle
        dense
        v-model="settings.enabled"
        color="green"
        label="Include"
      />
    </div>
    <div class="col-2">{{ row.COLUMN_NAME }}</div>
    <div class="col-1">{{ row.DATA_TYPE }}</div>
    <div class="col-1">{{ row.CHARACTER_MAXIMUM_LENGTH }}</div>
    <div class="col-2 q-pr-sm">
      <q-input
        dense
        v-model="settings.fieldName"
        type="text"
        label="Local field name"
        :disable="!settings.enabled"
      />
    </div>
    <div class="col-1 q-pr-sm">
      <q-select
        dense
        v-model="settings.dataType"
        :options="dataTypes"
        label=""

        :disable="!settings.enabled"
      />
    </div>
    <div class="col-1">
      <q-input dense  v-model="settings.size" type="text" label="size" />
    </div>
    <div class="col-3">
      <q-toggle
        v-model="settings.ai"
        color="green"
        label="AI"
        :disable="!settings.enabled"
      />
      <q-toggle
        v-model="settings.pk"
        color="green"
        label="PK"
        :disable="!settings.enabled"
      />
      <q-toggle
        v-model="settings.index"
        color="green"
        label="Idx"
        :disable="!settings.enabled"
      />
      <q-toggle
        class=""
        v-model="settings.nullable"
        color="green"
        label="Null"
        :disable="!settings.enabled"
      />
    </div>

    <div class="col-8">
      <q-input
        dense
        v-model="settings.fakeCommand"
        type="text"
        label="Fake Command"
        :disable="!settings.enabled"
      />
    </div>
    <div class="col-4 q-pl-sm">
      <q-input
        dense
        v-model="settings.percent"
        type="text"
        label="Percent"
        :disable="!settings.enabled"
      />
    </div>
    <div class="col-12" v-if="errorMessages.length > 0">
      <ul class="text-red">
        <li v-for="(message, index) in errorMessages" :key="index">{{message}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data: () => {
    return{
      settings:{
        enabled: false,
        fieldName: '',
        dataType: '',
        size: null,
        ai: false,
        pk: false,
        index: false,
        nullable: false,
        fakeCommand: '',
        percent: 1
      },
      error: false,
      errorMessages: [],
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
        ]
    }
  },
  watch:{
    settings: {
      deep: true,
      handler() {
        this.error = false
        this.errorMessages = []
        let error = false
        if(this.settings.enabled && this.settings.ai && !this.settings.pk){
          error = true
          this.errorMessages.push("Auto Increment column must also be a Primary Key")
        }
        if(this.settings.enabled && this.settings.dataType == 'VARCHAR' && (this.settings.size == "" || this.settings.size == null)){
          error = true
          this.errorMessages.push("VARCHAR Column must have a size")
        }
        if(this.settings.enabled && !this.settings.fieldName){
          error = true
          this.errorMessages.push("You must provide a field name")
        }
        if(this.settings.enabled && !this.settings.ai && !this.settings.fakeCommand && !this.settings.nullable){
          error = true
          this.errorMessages.push("All none Auto Incrementing fields that are not nullable must have a fake command")
        }

        if(error){
          this.error = true
        }
        this.$emit("changed", {remoteCol: this.row, localCol: this.settings, error: this.error})


      }
    },
    "settings.ai"(value){
      if(value){
        this.settings.pk = true
      }
    },
    "settings.enabled"(enabled){
      if(enabled){
        this.settings.fieldName = this.row.COLUMN_NAME
        this.settings.size = this.row.CHARACTER_MAXIMUM_LENGTH
        if(this.dataTypes.indexOf(this.row.DATA_TYPE.toUpperCase()) >= 0){
          this.settings.dataType = this.dataTypes[this.dataTypes.indexOf(this.row.DATA_TYPE.toUpperCase())]
        }
        if(this.row.DATA_TYPE == 'nvarchar'){
          this.settings.dataType = "VARCHAR"
        }
        if(this.row.DATA_TYPE == 'datetime2') {
          this.settings.dataType = 'DATETIME'
        }
        if(this.row.DATA_TYPE == 'numeric') {
          this.settings.dataType = 'DECIMAL'
          this.settings.size = "11,2"
        }
      }
    }
  },
  props:{
    row: {
      required: true,
      type: Object
    }
  },
  mounted() {}
};
</script>

<style>
.disabled{
  background-color: rgba(0,0,0,.1);
}
.enabled{
  /* border-color: rgba(0,255,0,.6);
  border-width: 2px;
  border-style: solild; */
  background-color: rgba(0,255,0,.05)
}
.error{
  background-color: rgba(255,0,0,0.1)
}
</style>
