<template>
  <div>
    <q-card class="bg-accent">
      <q-card-section>
        <q-card class="my-card">
          <q-card-section>
            <div class="text-h6">Select data to export</div>
            <div>
              <q-toggle v-model="useSQL" label="Use SQL Editor" />
            </div>
          </q-card-section>

          <q-card-section v-if="!useSQL">
            <q-card class="bg-accent">
              <q-card-section>
                <q-card class="my-card">
                  <q-card-section>
                    <SelectTables
                      :edit="editTable"
                    />
                  </q-card-section>
                </q-card>
              </q-card-section>
            </q-card>
          </q-card-section>

          <q-card-section v-if="useSQL">
            <q-card class="bg-accent">
              <q-card-section>
                <q-card class="my-card">
                  <q-card-section>
                    <Editor :edit="editSQL" />
                  </q-card-section>
                </q-card>
              </q-card-section>
            </q-card>
          </q-card-section>

          <q-card-section>
            <ExportList @edit="editExport" />
          </q-card-section>
        </q-card>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import Editor from "./SQLEditor";
import SelectTables from "./SelectTables";
import ExportList from "./ExportList";
import { mapState } from 'vuex'
export default {
  data: () => {
    return {
      editorKey: 0,
      database_id: null,
      useSQL: false,
      editTable: null,
      editSQL: null
    };
  },
  computed:{
    ...mapState('database', ['activeDatabase'])
  },
  watch:{
    activeDatabase(value){
      if(this.useSQL){
        this.useSQL = false
        setTimeout(()=>{
          this.useSQL = true
        }, 100)
      }
    }
  },
  components: {
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
