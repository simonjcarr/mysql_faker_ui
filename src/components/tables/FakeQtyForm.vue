<template>
  <div>
    <q-form
      @submit="onSubmit"
    >
      <q-input v-model="fake_qty" type="text" label="Fake Qty Command" hint="Can be numeric qty i.e. 100 or a Control Command. See the docs" />
      <div>
        <q-btn dense class="q-mt-sm" label="Save" type="submit" color="primary"/>

      </div>
    </q-form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data: () => {
    return {
      fake_qty: null
    }
  },
  watch:{
    activeTable(newValue) {
      this.fake_qty = this.activeTable.fake_qty
    }
  },
  computed:{
    ...mapState('table', ['activeTable'])
  },
  methods:{
    ...mapActions('table', ['updateFakeQty']),
    onSubmit() {
      this.updateFakeQty(this.fake_qty)
    }
  },
  mounted() {
    this.fake_qty = this.activeTable.fake_qty
  }
}
</script>

<style>

</style>
