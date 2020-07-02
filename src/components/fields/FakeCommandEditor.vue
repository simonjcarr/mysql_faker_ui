<template>
  <div style="min-width: 500px;">
    <div class="text-h4">Fake Command Editor</div>
    <div class="text-sm text-blue">{{activeDatabase.database_name}} > {{activeTable.table_name}} > {{field.name}}</div>
    <div>
      <q-btn class="q-mb-sm" size="sm" dense color="primary" icon="add" label="Add Command" @click="showAddForm" />
      <div v-if="totalPercent() !== 1" class="bg-red q-pa-sm text-white">
      Error Total percentage should be 100%, currently it is {{totalPercent() * 100}}%
      </div>
    </div>

    <q-card class="q-mb-sm" v-if="displayAddForm">
      <q-card-section>
        <div class="text-h6">{{newCommand.formTitle||"New Command"}}</div>
      </q-card-section>
      <q-card-section>
         <q-form
            @submit="newCommandSubmit"
            class="q-gutter-md"
          >
            <q-input dense v-model="newCommand.command" type="text" label="Command" hint="See docs for available commands and syntax" />
            <q-input dense v-model="newCommand.percent" type="text"  label="Percent" hint="The percentage times this command will be run 0.5 = 50%" />
            <div>
              <q-btn size="sm" label="Submit" type="submit" color="primary"/>
              <q-btn class="q-ml-sm" size="sm" label="Cancel" @click="displayAddForm = false" />
            </div>
          </q-form>
      </q-card-section>
    </q-card>

    <q-table
      title="Fake Commands"
      :data="fakeCommands"
      :columns="columns"
      row-key="id"
      selection="multiple"
      :selected.sync="selected"
      @row-click="rowClick"
    >
    <template v-slot:top>
      <q-btn size="sm" v-if="selected.length > 0" color="red" icon="delete" label="Delete Selected" @click="deleteSelected" />
    </template>
    </q-table>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Promise from 'bluebird'
import _ from 'lodash'
export default {
  data: () => {
    return {
      fakeCommands: [],
      columns: [
        {label:'Command', field: 'command'},
        {label: 'Percent', field: 'percent'}
      ],
      displayAddForm: false,
      newCommand: {
        command: '',
        percent: 1,
        command_id: null,
        formTitle: null
      },
      selected: [],
      showAddCommandForm: false
    }
  },
  watch:{
    displayAddForm(status){
      if(!status){
        this.newCommand.command = ''
        this.newCommand.percent = 1
        this.newCommand.command_id = null
        this.newCommand.formTitle = null
      }
    }
  },
  computed:{
    ...mapState('table', ['activeTable']),
    ...mapState('database', ['activeDatabase'])
  },
  methods:{
    ...mapActions('table', ['addFieldCommand', 'updateFieldCommand', 'getFieldCommands', 'deleteCommands']),
    showAddForm() {
      this.displayAddForm = true
    },
    totalPercent() {
      return _.sumBy(this.fakeCommands, (cmd)=>{ return cmd.percent })
    },
    newCommandSubmit() {
      if(this.newCommand.command_id){
        this.updateFieldCommand({
          command: this.newCommand.command,
          percent: this.newCommand.percent,
          command_id: this.newCommand.command_id
        }).then((commands)=>{
          this.getFieldCommands(this.field.id).then((commands)=>{
            this.fakeCommands = commands
            this.displayAddForm = false
            this.$emit('updated')
          })
        }).catch((err)=>{})
      }else{
        this.addFieldCommand({
          field_id: this.field.id,
          command: this.newCommand.command,
          percent: this.newCommand.percent
        }).then((commands)=>{
          this.getFieldCommands(this.field.id).then((commands)=>{
            this.fakeCommands = commands
            this.displayAddForm = false
            this.$emit('updated')
          })
        }).catch((err)=>{})
      }
    },
    rowClick(e, row) {
      console.log(row)
      this.newCommand.command = row.command
      this.newCommand.percent = row.percent
      this.newCommand.command_id = row.id
      this.newCommand.formTitle = 'Edit Command'
      this.displayAddForm = true
    },

    deleteSelected() {
      this.deleteCommands(this.selected).then(()=>{
        this.getFieldCommands(this.field.id).then((commands)=>{
          this.fakeCommands = commands
          this.selected = []
          this.$emit('updated')
        })
      })
    }
  },
  props:{
    field:{
      required: true,
      type: Object
    }
  },
  mounted() {
    this.fakeCommands = this.field.commands
  }
}
</script>

<style>

</style>
