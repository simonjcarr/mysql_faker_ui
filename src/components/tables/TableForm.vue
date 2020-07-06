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
    ...mapActions('table', ['updateActiveTable']),
    onSubmit() {
      if(!this.create) {

        //we are updating an existing form
        this.$axios.put(`/table/${this.activeTable.id}`, {
          ...this.tableData
        }).then((response)=>{
          this.$q.notify({type: 'positive', message: 'Table has been saved'})
          this.getDatabases().then(()=>{
            this.updateActiveTable()
          })
        }).catch((err)=>{
          this.$q.notify({type:'negative', message: 'There was an error saving the table: ' + err})
        })
      }else{

        this.$axios.post(`/table`, {
          ...this.tableData
        }).then((response)=>{
          this.$q.notify({type: 'positive', message: 'Table has been created'})
          this.getDatabases()
        }).catch((err)=>{
          this.$q.notify({type: 'negative', message: 'There was an error creating the table: ' + err.response})
        })
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
