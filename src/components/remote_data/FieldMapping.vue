<template>
  <div></div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data: () => {
    return{}
  },
  computed:{
    ...mapState('remotedata', ['mappings'])
  },
  methods:{
    ...mapActions('remotedata', ['clearMappings'])
  },
  mounted() {
    this.clearMappings()
  }
}
</script>

<style>

</style>
