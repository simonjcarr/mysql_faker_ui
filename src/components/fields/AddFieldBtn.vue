<template>
  <div style="min-width: 500px">
    <q-btn size="sm" dense color="primary" icon="add" label="Add Field" @click="addFieldClick" />
    <q-dialog v-model="showAddField" persistent>
      <q-card class="bg-accent">
        <q-card-section>
          <q-card class="q-px-sm" >
            <div class="q-pa-sm text-h6">Add Field</div>
            <q-card-section class="row items-center">
            <FieldForm @close="closeForm()"  style="min-width: 400px"/>
            </q-card-section>
            <q-card-actions align="right">
              <q-btn flat label="Cancel" color="primary" v-close-popup />
            </q-card-actions>
          </q-card>
        </q-card-section>
      </q-card>

    </q-dialog>
  </div>
</template>

<script>
import FieldForm from './FieldForm'
export default {
  data: () => {
    return {
      showAddField: false
    }
  },
  methods:{
    addFieldClick() {
      this.showAddField = true
    },
    closeForm(){
      this.showAddField = false
    }
  },
  components:{
    FieldForm
  }
}
</script>

<style>

</style>
