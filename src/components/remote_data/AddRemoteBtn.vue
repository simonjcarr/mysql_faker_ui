<template>
  <div>
    <q-btn
      color="primary"
      icon="add"
      label="Add Remote"
      @click="showManageClick"
      size="sm"
    />
    <q-dialog v-model="addRemote" persistent>
      <q-card class="my-card"  style="min-width: 500px;">
        <q-card-section class="bg-accent">
          <q-card  style="min-width: 500px;">
            <q-card-section class="row items-center">
              <AddRemoteForm />
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
import AddRemoteForm from './AddRemoteForm'
export default {
  data: () => {
    return {
      addRemote: false
    };
  },
  components:{
    AddRemoteForm
  },
  methods:{
    showManageClick(){
      this.addRemote = true
    }
  }
};
</script>

<style></style>
