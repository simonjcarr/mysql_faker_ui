<template>
  <q-page padding>
    <div class="">
      <div v-if="activeDatabase" class="text-h4 q-mb-sm text-orange">Database: {{activeDatabase.database_name}}</div>
      <div class="row">
        <div class="col-3">
          <AddTableBtn class="q-mb-sm" :create="true" />
          <TableList v-if="activeDatabase" @tableSelected="tableSelected" :dbID="activeDatabase.id" />
        </div>
        <div class="col-1"></div>
        <div class="col-8">
          <div class="text-h6">Table Settings</div>
          <div v-if="activeTable" >

            <q-card class="my-card">
              <q-card-section>
                <FakeQtyForm />
              </q-card-section>
            </q-card>

            <hr>

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
import AddTableBtn from './tables/EditTableBtn'
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
    AddTableBtn,
    FakeQtyForm
  }
}
</script>

<style>

</style>

