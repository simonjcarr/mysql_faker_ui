<template>
    <q-card class="my-card">

      <q-card-section class="">
        <q-form
          @submit="onSubmit"
        >
          <q-input required v-model="tableData.table_name" type="text" label="Table Name" />
          <q-input v-model="tableData.fake_qty" type="text" label="Fake Qty" />
          <q-input v-model="tableData.table_comments" type="textarea" label="Table Comments" />
          <div>
            <q-btn class="q-mt-sm" label="Save Table" type="submit" color="primary"/>
          </div>
        </q-form>
      </q-card-section>
    </q-card>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data: () => {
    return {
      tableData: {
        table_name: '',
        fake_qty: '',
        table_comments: '',
        database_id: null
      }
    }
  },
  props:{
    create: {
      required: false,
      default: false,
      type: Boolean
    }
  },
  computed: {
    ...mapState('table', ['activeTable']),
    ...mapState('database', ['activeDatabase'])
  },
  methods: {
    ...mapActions('database', ['getDatabases']),
    ...mapActions('table', ['updateActiveTable', 'createTable', 'updateTable']),
    onSubmit() {
      if(!this.create) {
        //we are updating an existing form
        this.updateTable(this.tableData)
      }else{
        this.createTable(this.tableData)
      }
      this.$emit('close')
    }
  },
  mounted() {
    if(!this.create){
      this.tableData.table_name = this.activeTable.table_name
      this.tableData.fake_qty = this.activeTable.fake_qty
      this.tableData.table_comments = this.activeTable.table_comments
    }
    this.tableData.database_id = this.activeDatabase.id
  }
}
</script>

<style>

</style>
