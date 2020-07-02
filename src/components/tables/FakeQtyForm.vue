<template>
  <div>
    <q-btn size="sm" color="green" label="Select Template" @click="showCommandTemplate=true" />
    <q-form
      @submit="onSubmit"
    >
      <q-input v-model="fake_qty" type="text" label="Fake Qty Command" hint="Can be numeric qty i.e. 100 or a Control Command. See the docs" />
      <div>
        <q-btn dense class="q-mt-sm" label="Save" type="submit" color="primary"/>

      </div>
    </q-form>
    <q-dialog v-model="showCommandTemplate" persistent>
      <q-card>
        <q-card-section class="row items-center">
          <ControlCommandTemplates @useTemplate="useTemplate" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import ControlCommandTemplates from '../../components/tables/ControlCommandTemplates'
export default {
  data: () => {
    return {
      fake_qty: null,
      showCommandTemplate: false
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
    },
    useTemplate(template){
      this.fake_qty = template
      this.showCommandTemplate = false
    }
  },
  mounted() {
    this.fake_qty = this.activeTable.fake_qty
  },
  components:{
    ControlCommandTemplates
  }
}
</script>

<style>

</style>
