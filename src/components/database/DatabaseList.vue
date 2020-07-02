<template>
  <div>
    <CreateDatabaseBtn />
    <q-tree
      :nodes="databaseNodes"
      node-key="id"
      :expanded.sync="expanded"
      :selected.sync="selected"
    />
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
import CreateDatabaseBtn from './CreateDatabaseBtn'
export default {
  data: () => {
    return {
      expanded: true,
      databaseNodes: [],
      selected: null,
      expanded: [0]
    }
  },
  methods: {
    ...mapActions('database', ['getDatabases', 'setActiveDatabase']),
    ...mapMutations('table', ['setActiveTable']),
    nodeClick(node) {
      this.setActiveDatabase(node.id)
      this.setActiveTable(null)
      this.$router.push(`/database/${node.id}`).catch(err => {})
    },
    createDatabase() {

    }
  },
  watch: {
    databases: function(nodes) {
      this.databaseNodes =   [
        {
          id: 0,
          label: 'Databases',
          children: []
        }
      ]
      this.databases.map((db)=>{
        this.databaseNodes[0].children.push({
          id: db.id,
          label: db.database_name,
          handler: this.nodeClick,
          selectable: true
        })
      })
    },
    user(u){
      this.getDatabases()
    }
  },
  computed: {
    ...mapState('database', ['databases']),
    ...mapState('user', ['user'])
  },
  mounted() {
    this.getDatabases()
  },
  components:{
    CreateDatabaseBtn
  }

}
</script>

<style>

</style>
