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
                    <Editor :database_id="database_id" />
                  </q-card-section>
                </q-card>
              </q-card-section>
            </q-card>
          </q-card-section>

          <q-card-section v-if="database_id">
            <ExportList :database_id="database_id" />
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
      useSQL: false
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
    }
  }
};
</script>

<style></style>
