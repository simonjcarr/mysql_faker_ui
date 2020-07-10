<template>
  <div>
    <div class="text-h6 text-bold text-primary">SQL Editor</div>
    <div>Enter SQL that will select data for output</div>
    <Editor
      v-model="content"
      @init="editorInit"
      lang="mysql"
      theme="dracula"
      width="100%"
      height="200px"
    ></Editor>
    <div class="row">
      <div class="col-4 q-mr-sm">
        <q-select
          class="q-mt-sm"
          dense
          v-model="format"
          :options="formatOptions"
          label="Output Format"
          filled
        />
        <div v-if="getFormatValue=='mysql'">
          <q-input dense v-model="sql_insert_table" type="text" label="Table Name" />
        </div>
      </div>
      <div class="col-4 q-mr-sm">
        <q-input
          class="q-mt-sm"
          dense
          v-model="filename"
          type="text"
          label="Filename"
        />
      </div>
      <div class="col-2">
        <q-toggle v-model="active" color="green" label="Active" />
      </div>
    </div>
    <q-btn
      class="q-mt-sm"
      dense
      color="primary"
      :icon="editRow?'save':'add'"
      :label="editRow?'Save Changes':'Add'"
      @click="createExport"
    />
    <q-btn v-if="editRow" class="q-mt-sm q-ml-sm" dense color="primary" icon="clear" label="Cancel Edit" @click="cancelEdit" />
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  data: () => {
    return {
      componentKey: 0,
      content: '',
      format: "",
      sql_insert_table: "",
      formatOptions: [
        { label: "CSV", value: "csv" },
        { label: "XML", value: "xml" },
        { label: "SQL Inserts (MySQL)", value: "mysql" },
        { label: "SQL Inserts (MSSQL)", value: "mssql" }
      ],
      filename: "",
      active: true,
      tables: [],
      editRow: false
    };
  },
  computed:{
    ...mapGetters('database', ['getDatabase']),
    ...mapState('database', ['activeDatabase']),
    getFormatValue(){
      try{
        return this.format.value
      }catch(err){
        return null
      }
    }
  },
  watch:{
    edit(row){
      this.editRow = true
      try{
        this.content = row.sql
        this.format = row.format
        this.filename = row.file_name
        this.active = row.active==1?true:false
      }catch(err){}
    }
  },
  props: {
    edit: {
      required: false,
      type: Object,
      default: null
    }
  },
  components: {
    Editor: require("vue2-ace-editor")
  },
  methods: {
    ...mapActions("data_export", ["createTableOutput"]),
    editorInit: function(editor) {
      var staticWordCompleter = {
        getCompletions: function(editor, session, pos, prefix, callback) {
          var wordList = editor.tables
          callback(null, [
            ...wordList.map(function(word) {
              return {
                caption: word,
                value: word,
                meta: "static"
              };
            })
          ]);
        }
      };
      require("brace/ext/language_tools"); //language extension prerequsite...
      require("brace/mode/html");
      require("brace/mode/mysql"); //language
      require("brace/mode/less");
      require("brace/theme/dracula");
      require("brace/snippets/mysql"); //snippet
      editor.setOptions({
        enableBasicAutocompletion: true,
        enableLiveAutocompletion: true
      });
      editor.completers = [staticWordCompleter]
      editor['tables'] = this.tables
      editor.setFontSize("18px")

    },
    createExport() {
      this.createTableOutput({
        database_id: this.activeDatabase.id,
        tbl_id: null,
        sql: this.content,
        file_name: this.filename,
        format: this.format.value,
        sql_insert_table: this.sql_insert_table,
        active: this.active,
        template: null,
        edit: this.edit
      });
      this.content = ""
      this.filename = ""
      this.format = ""
      this.sql_insert_table = ""
      this.editRow = false
    },
    getTables() {
      this.tables = []
      let db = this.getDatabase(this.activeDatabase.id)
      db[0].tables.map(table=>{
        this.tables.push(table.table_name)
      })
    },
    cancelEdit() {
      this.$q.dialog({
        title: 'Confirm Cancel Edit',
        message: 'Are you sure you want to cancel. You will loose any changes you have made',
        cancel: true
      }).onOk(()=>{
        this.edit = null
        this.content = ''
        this.format = null
        this.sql_insert_table = null
        this.filename = ''
        this.active = true
      })
    }
  },
  beforeMount() {
    this.getTables()
  }
};
</script>

<style></style>
