<template>
  <div>
    <q-markdown
    :src="'```\n' + JSON.stringify(markdown,null,2) + '\n```'"
    >

    </q-markdown>
  </div>
</template>

<script>
import Promise from 'bluebird'
import { mapState } from 'vuex'
export default {
  data: () => {
    return {
      markdown:{}
    }
  },
  computed:{
     ...mapState('database', ['activeDatabase'])
  },
  methods: {

  },
  async mounted() {
    let json = {}
    json['database_name'] = this.activeDatabase.database_name
    json['drop'] = this.activeDatabase.drop
    json['tables'] = []
    await Promise.map(this.activeDatabase.tables, async (t) => {
      let table = {
        table_name: '',
        fake_qty: '',
        fields: []
      }
      table.table_name = t.table_name
      table.fake_qty = t.fake_qty


      await Promise.map(t.fields, async (f) => {
        let field = {
          name: '',
          data_type: '',
          size: '',
          ai: false,
          null: false,
          pk: false,
          index: false,
          default: "",
          fake: []
        }
        field.name = f.name
        field.data_type = f.data_type
        field.size = f.size
        field.ai = f.auto_increment?true:false
        field.null = f.nullable?true:false
        field.pk = f.primary_key?true:false
        field.default = ""

        await Promise.map(f.commands, (c) =>{
          let command = {
            command: '',
            percent: ''
          }
          command.command = c.command
          command.percent = c.percent
          field.fake.push(command)
        })

        table.fields.push(field)

      })
      json.tables.push(table)
    })
    this.markdown = json


  }
}
</script>

<style>

</style>
