<template>
  <q-page class="flex flex-center">
    <div >
      <div class="text-h1 text-accent text-bold"><span class="">Test</span>  <span class="text-primary"> Data</span> Generator</div>
      <div class="q-mt-xl">
        <q-btn color="primary" size="xl" label="Get Started" @click="getStartedClick" />
      </div>
    </div>

  </q-page>
</template>

<script>
import { mapState } from 'vuex'
import Vue from 'vue'
var vm = new Vue()
export default {
  name: 'PageIndex',
  data: () => {
    return {
      name: ''
    }
  },
  methods:{
    getStartedClick(){
      console.log("I am here")
      window.open("https://github.com/simonjcarr/mysql_faker", "_blank")
    }
  },
  mounted() {

  }
}
</script>

<style scoped>

</style>
