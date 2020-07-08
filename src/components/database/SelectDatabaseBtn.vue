<template>
  <div>
    <q-select v-model="selectedDB" :options="options" label="Select Database" filled required dense />
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data: () => {
    return{
      options: [],
      selectedDB: null
    }
  },
  watch:{
    selectedDB(db) {
      this.$emit('databaseChanged', db.value)
    }
  },
  computed:{
    ...mapState('database', ['databases'])
  },
  mounted() {
    this.databases.map((db) => {
      this.options.push({
        value: db.id,
        label: db.database_name
      })
    })
  }
}
</script>

<style>

</style>
