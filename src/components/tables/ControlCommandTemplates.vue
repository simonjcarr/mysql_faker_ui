<template>
  <div>
    <q-card class="q-mb-sm" v-for="(template, index) in templates" :key="index">
      <q-card-section>
        <div class="text-h6">
          {{template.name}}
          <q-btn size="sm" dense class="block" color="green" icon="check" label="Use this template" @click="useTemplateClick(template.template)" />
        </div>
      </q-card-section>
      <q-card-section>
        <div class="text-blue">{{template.template}}</div>
      </q-card-section>
      <q-card-section>
        <div class="text-sm">{{template.description}}</div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      templates: [
        {
          name: 'Bill of Material',
          template: 'BOB|<ASO Count>|<Total Child Items>|<Max Lineage Deapth>',
          description:`Generates a bill of material that can be used to populate the table. <ASO Count> is the number of top level items to create.
          <Total Child Items> is the total number of items that each top level (ASO) will contain
          <Max Lineage Deapth> is the maximum deapth the tree will in the BOM will branch to.
          `
        },
        {
          name: 'Table Each',
          template: 'table|each|<table_name>|<min_qty_copies> (optional)|<max_qty_copies> (optional)',
          description: `Gets each record from the table specified in <table_name>
          If <min_qty_copies> and <max_qty_copies> are specified a random quantity of each row from <table_name> will be copied. This is useful for scenarios like purchase_order_lines, where each purchase_order would have a different number of purchase_order_lines
          `
        },

      ]
    }
  },
  methods:{
    useTemplateClick(template){
      this.$emit('useTemplate', template)
    }
  }
}
</script>

<style>

</style>
