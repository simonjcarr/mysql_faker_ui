<template>
  <div>
    <CreateDatabaseBtn />
    <q-tree
      :nodes="databaseNodes"
      node-key="id"
      :expanded.sync="expanded"
      :selected.sync="selected"
      text-color="accent"
      v-if="getToken"
    />
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations, mapGetters } from 'vuex'
import CreateDatabaseBtn from './CreateDatabaseBtn'
import Promise from 'bluebird'
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
    "getDatabaseList": function(nodes) {
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
    ...mapState('user', ['user', 'token']),
    ...mapGetters('database', ['getDatabaseList']),
    ...mapGetters('user', ['getToken'])
  },
  mounted() {
    try{
      if(this.token.token){
        console.log("I am here")
        this.getDatabases()
      }
    }catch(err){}
  },
  components:{
    CreateDatabaseBtn
  }

}
</script>

<style>

</style>
