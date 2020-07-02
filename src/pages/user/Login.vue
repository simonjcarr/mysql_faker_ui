<template>
  <q-page class="row justify-center" padding>
    <div class="col-4">
      <div class="text-h4">Login</div>
      <div v-if="errors.length > 0" class="bg-red-2 rounded-borders q-pa-sm text-red-10">
        <div v-for="(error, index) in errors" :key="index">{{error.message}}</div>
      </div>
      <q-form
        @submit="onSubmit"
        class="q-gutter-md"
      >
        <div>
          <q-input class="full-width" v-model="email" type="email" label="Email" />
        </div>
        <div>
          <q-input class="full-width" v-model="password" type="password" label="Password" />
        </div>
        <div>
          <q-btn label="Submit" type="submit" color="primary"/>
        </div>
      </q-form>
    </div>
</q-page>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data: () => {
    return {
      email: '',
      password: '',
      errors: []
    }
  },
  methods: {
    ...mapActions('user', ['login']),
    onSubmit() {
      this.login({
        email: this.email,
        password: this.password
      }).then((result)=>{
        this.$router.push('/')
      }).catch((err) => {})
    }
  }
}
</script>

<style>

</style>
