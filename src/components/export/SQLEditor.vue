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
      icon="add"
      label="Add"
      @click="createExport"
    />
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
export default {
  data: () => {
    return {
      content: "",
      format: "",
      formatOptions: [
        { label: "CSV", value: "csv" },
        { label: "XML", value: "xml" },
        { label: "SQL Inserts (MySQL)", value: "mysql" },
        { label: "SQL Inserts (MSSQL)", value: "mssql" }
      ],
      filename: "",
      active: true,
      tables: []
    };
  },
  computed:{
    ...mapGetters('database', ['getDatabase'])
  },
  props: {
    database_id: {
      required: true,
      type: Number
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
            }),
            ...session.$mode.$highlightRules.$keywordList.map(function(word) {
              return {
                caption: word,
                value: word,
                meta: "keyword"
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

    },
    createExport() {
      this.createTableOutput({
        database_id: this.database_id,
        tbl_id: null,
        sql: this.content,
        file_name: this.filename,
        format: this.format.value,
        active: this.active,
        template: null
      });
      this.content = ""
      this.filename = ""
      this.format = ""
    },
    getTables() {
      this.tables = []
      let db = this.getDatabase(this.database_id)
      db[0].tables.map(table=>{
        this.tables.push(table.table_name)
      })
    }
  },
  beforeMount() {
    this.getTables()
  }
};
</script>

<style></style>
