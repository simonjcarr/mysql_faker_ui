<template>
  <div>
    <q-form
      @submit="onSubmit"
    >
      <div>
        <q-input required v-model="field.name" type="text" label="Field Name" />
        <q-select required v-model="field.data_type" :options="dataTypes" label="Data Type" />
        <q-input v-model="field.size" type="text" label="Field Size" />
        <div>
          <q-toggle v-model="field.auto_increment" color="green" label="Auto Increment" />
        </div>
        <div>
          <q-toggle v-model="field.nullable" color="green" label="Nullable" />
        </div>
        <div>
          <q-toggle v-model="field.idx" color="green" label="Index" />
        </div>
        <div>
          <q-toggle v-model="field.primary_key" color="green" label="Primary Key" />
        </div>
        <q-input v-model="field.description" type="textarea" label="Description" />
        <q-btn class="q-mt-sm" label="Submit" type="submit" color="primary"/>

      </div>
    </q-form>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default {
  data: () => {
    return {
      field: {
        tbl_id: null,
        name: null,
        data_type: null,
        size: null,
        auto_increment: false,
        nullable: false,
        primary_key: false,
        idx: false,
        description: null,
        id: null
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
  computed:{
    ...mapState('table', ['activeTable'])
  },
  methods: {
    ...mapActions('table', ['addField', 'updateField']),
    onSubmit() {
      console.log(this.field)
      if(this.editField){
        this.updateField(this.field)
      }else{
        this.addField(this.field)
      }
      this.$emit('close')
    }
  },
  props:{
    editField:{
      required: false,
      type: Object
    }
  },
  mounted() {

    this.field.tbl_id = this.activeTable.id
    if(this.editField){
      console.log(this.editField)
      this.field.name = this.editField.name
      this.field.data_type = this.editField.data_type
      this.field.size = this.editField.size
      this.field.auto_increment = this.editField.auto_increment==1?true:false
      this.field.nullable = this.editField.nullable==1?true:false
      this.field.primary_key = this.editField.primary_key==1?true:false
      this.field.idx = this.editField.idx==1?true:false
      this.field.description = this.editField.description
      this.field.id = this.editField.id
    }

  }
}
</script>

<style>

</style>
