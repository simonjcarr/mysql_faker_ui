<template>
  <div class="text-accent text-h6 row">
    <div class="col-2">
      Status: <span :class="{'text-green':activeDatabase.status=='complete', 'text-accent':!activeDatabase.status, 'text-red':activeDatabase.status=='error'}" class="text-bold">{{getDatabaseState}}</span>
    </div>
    <div class="col-2">
      Table Count: <span class="text-primary text-bold">{{activeDatabase.tables.length}}</span>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data: () => {
    return{}
  },
  computed:{
    ...mapState('database', ['activeDatabase']),
    getDatabaseState() {
      if(!this.activeDatabase.status){
        return "Not Built"
      }
      if(this.activeDatabase.status == 'complete'){
        return "Build Complete"
      }
      if(this.activeDatabase.status == 'error') {
        return "Build Error"
      }
      return "Unknown State"
    }
  }
}
</script>

<style>

</style>
