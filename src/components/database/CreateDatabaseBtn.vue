<template>
  <div>
    <q-btn size="sm" dense color="primary" icon="add" label="Create Database" @click="createDatabasePrompt" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {

  computed: {
    ...mapState('user', ['user'])
  },
  methods: {
    ...mapActions('database', ['createDatabase']),
    createDatabasePrompt() {
      this.$q.dialog({
        title: 'Database Name',
        message: `Your database will automatically be prefixed with your username i.e. ${this.user.username}_xxxxxxx`,
        prompt: {
          model: '',
          type: 'text',
        },
        cancel: true,
        persistent: true
      }).onOk(data => {
        this.createDatabase(`${this.user.username}_${data}`).then(()=>{

        }).catch((err)=>{
         
        })
      })
    }
  }
}
</script>

<style>

</style>
