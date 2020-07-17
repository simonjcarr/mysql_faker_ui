<template>
  <q-card class="my-card">
    <q-card-section>
      <q-select dense v-model="selectedTable" :options="tableOptions" label="Select Table" filled />
    </q-card-section>
  </q-card>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
  data: () => {
    return{
      selectedTable: null
    }
  },
  watch:{
    selectedTable(table){
      // this.$emit('selected', table)
      this.setSelectedTable(table.value)
      this.getTableSchema()
    }
  },
  computed:{
    ...mapState('remotedata', ['tables']),
    tableOptions() {
      return _.sortBy(this.tables, (o) => { return o.TABLE_NAME}).map(table => {
        return {label: table.TABLE_NAME, value: table.TABLE_NAME}
      })
    }
  },
  methods:{
    ...mapMutations('remotedata', ['setSelectedTable']),
    ...mapActions('remotedata', ['getTableSchema'])
  }

}
</script>

<style>

</style>
