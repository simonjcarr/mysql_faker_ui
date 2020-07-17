<template>
  <q-card class="my-card">
    <q-card-section>
      <q-select
        dense
        use-input
        input-debounce="0"
        @input-value="setFilter"
        v-model="selectedTable"
        :options="tableOptions"
        label="Select Table"
        filled
      />
    </q-card-section>
  </q-card>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
  data: () => {
    return {
      selectedTable: null,
      tableFilter: ""
    };
  },
  watch: {
    selectedTable(table) {
      // this.$emit('selected', table)
      this.setSelectedTable(table.value);
      this.getTableSchema();
    }
  },
  computed: {
    ...mapState("remotedata", ["tables"]),
    tableOptions() {
      var tables = this.tables;
      if (this.tableFilter !== "") {
        tables = _.filter(tables, t => {
          return t.TABLE_NAME.indexOf(this.tableFilter) !== -1;
        });
      }
      console.log(tables)
      return _.sortBy(tables, o => {
        return o.TABLE_NAME;
      }).map(table => {
        return { label: table.TABLE_NAME, value: table.TABLE_NAME };
      });
    }
  },
  methods: {
    ...mapMutations("remotedata", ["setSelectedTable"]),
    ...mapActions("remotedata", ["getTableSchema"]),
    setFilter(value){
      this.tableFilter = value
    }
  }
};
</script>

<style></style>
