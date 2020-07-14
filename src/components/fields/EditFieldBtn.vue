<template>
  <div>
    <q-btn
      size="sm"
      dense
      color="primary"
      icon="edit"
      label=""
      @click="editFieldClick"
    />
    <q-dialog v-model="showEditField" persistent>
      <q-card style="min-width: 400px;">
        <q-card-section class="row items-center bg-accent">
          <q-card style="min-width: 400px;" class="my-card">
            <q-card-section>
              <FieldForm @close="closeForm" :editField="field" />
            </q-card-section>
          </q-card>
        </q-card-section>
        <q-card-actions align="right" class="bg-accent">
          <q-btn flat label="Cancel" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import FieldForm from "./FieldForm";
export default {
  data: () => {
    return {
      showEditField: false
    };
  },
  components: {
    FieldForm
  },
  props: {
    field: {
      required: true,
      type: Object
    }
  },
  methods: {
    editFieldClick() {
      this.showEditField = true;
    },
    closeForm() {
      this.showEditField = false
    }
  },
  mounted() {
    console.log(this.field)
  }
};
</script>

<style></style>
