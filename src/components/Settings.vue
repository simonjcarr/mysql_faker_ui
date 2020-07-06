<template>
  <q-page padding>
    <div class="">

      <div class="row">
        <div class="col-3">
          <div v-if="activeDatabase" class="text-h5 q-mb-sm text-accent text-bold">Database: <span class="text-primary">{{activeDatabase.database_name}}</span></div>
          <TableList v-if="activeDatabase" @tableSelected="tableSelected" :dbID="activeDatabase.id" />
        </div>
        <div class="col-1"></div>
        <div class="col-8">
          <div v-if="activeTable" class="text-h5 text-accent text-bold q-mb-sm">Table Settings: <span class="text-primary">{{activeTable.table_name}}</span></div>

          <div v-if="activeTable" >

            <q-card class="bg-accent text-secondary q-mb-sm">
              <q-card-section>
                <FakeQtyForm />
              </q-card-section>
            </q-card>

            <TableFields v-if="activeTable" />
          </div>
        </div>

      </div>
    </div>

  </q-page>
</template>

<script>
import TableList from './tables/TableList'
import TableFields from 'components/fields/TableFields'
import FakeQtyForm from './tables/FakeQtyForm'
import { mapState } from 'vuex'
export default {
  data: () => {
    return {
      database: null,
      selectedTable: null
    }
  },
  computed:{
    ...mapState('database', ['activeDatabase']),
    ...mapState('table', ['activeTable'])
  },
  methods: {
    tableSelected(row){
      this.selectedTable = row
    },
    addDatabase() {
      console.log("add database")
    }
  },
  components: {
    TableList,
    TableFields,
    FakeQtyForm
  }
}
</script>

<style>

</style>

