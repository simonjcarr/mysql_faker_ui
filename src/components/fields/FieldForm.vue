<template>
  <div>
    <q-form
      @submit="onSubmit"
    >
      <div>
        <q-input required v-model="field.name" type="text" label="Field Name" />
        <q-select required v-model="field.data_type" :options="dataTypes" label="Data Type" />
        <q-input v-model="field.size" type="number" label="Field Size" />
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
        description: null
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
    ...mapActions('table', ['addField']),
    onSubmit() {
      this.addField(this.field)
      this.$emit('close')
    }
  },
  mounted() {
    this.field.tbl_id = this.activeTable.id

  }
}
</script>

<style>

</style>
