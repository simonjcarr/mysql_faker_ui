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
    <div class="col-2">
      <q-input
        dense
        filled
        v-model="settings.fieldName"
        type="text"
        label="Local field name"
        :disable="!settings.enabled"
      />
    </div>
    <div class="col-1 q-ml-sm">
      <q-select
        dense
        v-model="settings.dataType"
        :options="dataTypes"
        label=""
        filled
        :disable="!settings.enabled"
      />
    </div>
    <div class="q-ml-sm col-3">
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
        class="q-pr-sm"
        v-model="settings.nullable"
        color="green"
        label="Null"
        :disable="!settings.enabled"
      />
    </div>

    <div class="col-12">
      <q-input
        dense
        v-model="settings.fakeCommand"
        type="text"
        label="Fake Command"
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
        ai: false,
        pk: false,
        index: false,
        nullable: false,
        fakeCommand: '',
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
