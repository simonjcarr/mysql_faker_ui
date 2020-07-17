<template>
  <div class=" row q-pa-sm rounded-borders" :class="{'disabled':!settings.enabled, 'enabled': settings.enabled}">
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
        this.$emit("changed", {remoteCol: this.row, localCol: this.settings})
      }
    },
    "settings.enabled"(enabled){
      console.log("I am here")
      if(enabled){
        this.settings.fieldName = this.row.COLUMN_NAME
        this.settings.size = this.row.CHARACTER_MAXIMUM_LENGTH
        if(this.dataTypes.indexOf(this.row.DATA_TYPE.toUpperCase()) >= 0){
          this.settings.dataType = this.dataTypes[this.dataTypes.indexOf(this.row.DATA_TYPE.toUpperCase())]
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
</style>
