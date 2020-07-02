<template>
<q-page class="row justify-center" padding>
    <div class="col-4">
      <div class="text-h4">Register</div>
      <div v-if="errors.length > 0" class="bg-red-2 rounded-borders q-pa-sm text-red-10">
        <div v-for="(error, index) in errors" :key="index">{{error.message}}</div>
      </div>
      <q-form
        @submit="onSubmit"
        class="q-gutter-md"
      >
        <div>
          <q-input class="full-width" v-model="username" type="text" label="Username" />
        </div>
        <div>
          <q-input class="full-width" v-model="email" type="email" label="Email" />
        </div>
        <div>
          <q-input class="full-width" v-model="password" type="password" label="Password" />
        </div>
        <div>
          <q-input class="full-width" v-model="confirm_password" type="password" label="Confirm Password" />
        </div>
        <div>
          <q-btn label="Submit" type="submit" color="primary"/>
        </div>
      </q-form>
    </div>
</q-page>
</template>

<script>
import Vue from 'vue'
import { mapMutations, mapState } from 'vuex'
var vm = new Vue()
export default {
  data: () => {
    return {
      username: '',
      email: '',
      password: '',
      confirm_password: '',
      errors: []
    }
  },
  computed: {
    ...mapState('user', ['token'])
  },
  methods: {
    ...mapMutations('user', ['setToken', 'setUser']),

    onSubmit() {
      this.errors = []
      this.$axios.post('/user/register', {
        username: this.username,
        email: this.email,
        password: this.password,
        confirm_password: this.confirm_password
      }).then(({ data }) => {
        console.log(data)
        this.setToken(data.token)
        this.setUser(data.user)
        this.$q.notify({
          type: 'positive',
          message: 'Your account has been created you were signed in'
        })
      }).catch((err) => {
        this.errors = err.response.data
      })
    }
  },
  mounted() {
    if(this.token) {
      this.$router.push('/')
    }
  }
}
</script>

<style>

</style>
