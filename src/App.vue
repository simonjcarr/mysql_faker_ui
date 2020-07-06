<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import { mapState } from 'vuex'
import Ws from '@adonisjs/websocket-client/index'
const ws = Ws('ws://localhost:3333')
export default {
  name: 'App',
  mounted() {
    ws.connect()
    ws.on('open', () => {
      console.log("Websocket connection open")
      const job = ws.subscribe('job')
      job.on('ready', () => {
        job.emit('message', 'hello')
      })
      job.on('message', (message) => {
        this.setMessage(message)
      })
    })
    ws.on('close', () => {
      console.log("Websocket connection closed")
    })
  },
  methods:{
    ...mapMutations('job', ['setMessage'])
  }
}
</script>
