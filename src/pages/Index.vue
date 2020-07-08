<template>
  <q-page class="flex flex-center">
    <div >
      <div class="text-h1 text-accent text-bold"><span class="">Test</span>  <span class="text-primary"> Data</span> Generator</div>
      <div class="q-mt-xl">
        <q-btn color="primary" size="xl" label="Get Started" to="/database" />
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
  mounted() {

  }
}
</script>

<style scoped>

</style>
