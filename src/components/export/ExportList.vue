<template>
  <div>
    <q-card class="bg-accent">
      <q-card-section>
        <q-card class="my-card">
          <q-card-section>
            <q-table
              dense=""
              title="Exports"
              :data="exports"
              :columns="columns"
              row-key="id"
              :selected.sync="selected"
              selection="multiple"

            >
              <template v-slot:top>
                <div class="flex">
                  <div class="text-h6 text-bold">Exports</div>
                  <div>
                    <q-btn
                      class="q-ml-sm"
                      dense
                      size="sm"
                      color="orange"
                      icon="delete"
                      label="Delete Selected"
                      @click="deleteSelected"
                    />
                  </div>
                  <div>
                    <q-btn v-if="hasAvailableFiles" class="q-ml-sm" size="sm" dense color="primary" icon="compress" label="Download Zip" @click="downloadZip" />
                  </div>
                </div>
              </template>
              <template v-slot:body-cell-status="props">
                <q-td :props="props">
                  <div>
                    <q-btn v-if="props.row.file" size="sm" dense color="primary" icon="cloud_download" label="Download" @click="downloadFile(props.row)" />
                  </div>
                </q-td>
              </template>
            </q-table>
          </q-card-section>
        </q-card>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import axios from "axios";
import _ from 'lodash'
export default {
  data: () => {
    return {
      columns: [
        {
          name: "source",
          label: "Source",
          field: row => (row.tbl_id ? "Table" : "SQL"),
          sortable: true
        },
        {
          name: "source_value",
          label: "Table / SQL",
          field: row => (row.tbl_id ? row.table.table_name : row.sql),
          sortable: true
        },
        { name: "format", label: "Format", field: "format", sortable: true },
        {
          name: "filename",
          label: "Filename",
          field: "file_name",
          sortable: true
        },
        {
          name: "status",
          label: "Status",
          field: "",
          sortable: true
        },
        {
          name: "active",
          label: "Active",
          field: row => (row.active ? "True" : "False"),
          sortable: true
        }
      ],
      selected: []
    };
  },
  watch: {
    activeDatabase(value) {
      this.getExports(value.id);
    }
  },
  computed: {
    ...mapState("data_export", ["exports"]),
    ...mapState("database", ["activeDatabase"]),
    hasAvailableFiles(){
      return _.filter(this.exports, e => {
        e.file
      })
    }
  },
  methods: {
    ...mapActions("data_export", ["getExports", "deleteExports"]),
    deleteSelected(rows) {
      this.deleteExports(this.selected);
      this.selected = [];
    },
    onRowClick(e, row) {
      this.$emit("edit", row);
    },
    getFileStatus(row) {
      try {
        if (row.file.id) {
          return "<a >Download</a>";
        }
      } catch (e) {
        return "Unavailable";
      }
      return "Unavailable";
    },
    downloadFile(row) {
      console.log(row)
      axios({
        url: `${process.env.API_URL}/api/v1/export/file/download/${row.file.id}`,
        method: "GET",
        responseType: "blob"
      }).then(response => {
        var fileURL = window.URL.createObjectURL(new Blob([response.data]));
        var fileLink = document.createElement("a");

        fileLink.href = fileURL;
        fileLink.setAttribute("download", row.file_name);
        document.body.appendChild(fileLink);

        fileLink.click();
      });
    },
    downloadZip(){
      axios({
        url: `${process.env.API_URL}/api/v1/export/file/download/zip/${this.activeDatabase.id}`,
        method: "GET",
        responseType: "blob"
      }).then(response => {
        var fileURL = window.URL.createObjectURL(new Blob([response.data]));
        var fileLink = document.createElement("a");

        fileLink.href = fileURL;
        fileLink.setAttribute("download", `${this.activeDatabase.database_name}.zip`);
        document.body.appendChild(fileLink);

        fileLink.click();
      });
    }
  },
  mounted() {
    this.getExports(this.activeDatabase.id);
  }
};
</script>

<style></style>
