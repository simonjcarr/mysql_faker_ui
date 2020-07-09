<template>
  <div id="q-app" class="bg-secondary">
    <router-view />
  </div>
</template>

<script>
import { mapMutations, mapState, mapActions } from 'vuex'
import Ws from '@adonisjs/websocket-client/index'
const ws = Ws('ws://localhost:3333')
export default {
  name: 'App',
  mounted() {
    ws.connect()
    ws.on('open', () => {
      const job = ws.subscribe('job')
      job.on('ready', () => {
        job.emit('message', 'hello')
      })
      job.on('message', (message) => {
        this.setMessage(message)
        if(message.status == 'complete' || message.status == 'error'){
          this.setStatusFromMessage(message)
        }
      })
    })
    ws.on('close', () => {
      console.log("Websocket connection closed")
    })

  },
  methods:{
    ...mapMutations('job', ['setMessage']),
    ...mapActions('database', ['setStatusFromMessage'])
  }
}
</script>
<style lang="sass">
.sticky-header-table
  /* height or max-height is important */
  height: 310px

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th
    /* bg color is important for th; just specify one */
    background-color: $secondary
    color: white
  thead tr th
    position: sticky
    z-index: 1
  thead tr:first-child th
    top: 0

  /* this is when the loading indicator appears */
  &.q-table--loading thead tr:last-child th
    /* height of all previous header rows */
    top: 48px// app global css in SCSS form
</style>
