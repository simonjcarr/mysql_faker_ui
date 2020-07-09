<template>
  <div>
    <q-card class="bg-accent q-mb-sm">
      <q-card-section>
        <q-card class="my-card">
          <q-card-section>
            <SelectDatabaseBtn @databaseChanged="databaseChanged" />
          </q-card-section>
        </q-card>
      </q-card-section>
    </q-card>

    <q-card class="bg-accent">
      <q-card-section v-if="database_id">
        <q-card class="my-card">
          <q-card-section>
            <div class="text-h6">Select data to export</div>
            <div>
              <q-toggle v-model="useSQL" label="Use SQL Editor" />
            </div>
          </q-card-section>

          <q-card-section v-if="database_id && !useSQL">
            <q-card class="bg-accent">
              <q-card-section>
                <q-card class="my-card">
                  <q-card-section>
                    <SelectTables
                      :edit="editTable"
                      :database_id="database_id"
                    />
                  </q-card-section>
                </q-card>
              </q-card-section>
            </q-card>
          </q-card-section>

          <q-card-section v-if="database_id && useSQL">
            <q-card class="bg-accent">
              <q-card-section>
                <q-card class="my-card">
                  <q-card-section>
                    <Editor :edit="editSQL" :database_id="database_id" />
                  </q-card-section>
                </q-card>
              </q-card-section>
            </q-card>
          </q-card-section>

          <q-card-section v-if="database_id">
            <ExportList @edit="editExport" :database_id="database_id" />
          </q-card-section>
        </q-card>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import SelectDatabaseBtn from "../database/SelectDatabaseBtn";
import Editor from "./SQLEditor";
import SelectTables from "./SelectTables";
import ExportList from "./ExportList";
export default {
  data: () => {
    return {
      database_id: null,
      useSQL: false,
      editTable: null,
      editSQL: null
    };
  },
  components: {
    SelectDatabaseBtn,
    Editor,
    SelectTables,
    ExportList
  },
  methods: {
    databaseChanged(db_id) {
      this.database_id = db_id;
    },
    editExport(row){
      this.editTable = null
      this.editSQL = null
      if(row.tbl_id){
        this.useSQL = false
        setTimeout(()=>{
          this.editTable = row
        },200)

      }else{
        this.useSQL = true
        setTimeout(()=>{
          this.editSQL = row
        },200)
      }
    }
  }
};
</script>

<style></style>
