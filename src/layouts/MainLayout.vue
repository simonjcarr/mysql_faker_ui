<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>

         <q-btn
          flat
          label="BAE Data Faker"
          aria-label="Menu"
          class="text-h6"
          to="/"
        />
        </q-toolbar-title>
        <div v-if="!token">
          <q-btn
          flat
          icon="login"
          label="Login"
          aria-label="Menu"
          to="/user/login"
        />
        <q-btn
          flat
          icon="how_to_reg"
          label="Register"
          aria-label="Menu"
          to="/user/register"
        />
        </div>
        <div v-if="token">
          <q-btn flat icon="logout" label="Logout" @click="logoutClick" />
          <q-btn flat icon="person" :label="`${user.username}`" />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-secondary"
      class="bg-secondary"
    >
      <q-list class="bg-secondary text-accent">
        <q-item-label
          header
        >
             <q-img
              src="logo.png"
              :ratio="16/9"
              height="30px"
              spinner-color="primary"
              spinner-size="82px"
            />
        </q-item-label>
        <q-item-label
          header
          class="bg-secondary"
        >

          Database Resources
        </q-item-label>
        <DatabaseList />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>

import EssentialLink from 'components/EssentialLink.vue'
import DatabaseList from 'components/database/DatabaseList'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'MainLayout',

  components: {
    DatabaseList
  },
  methods: {
    ...mapActions('database', ['getDatabases']),
    ...mapActions('user', ['logout']),
    logoutClick(){
      this.logout()
      this.$router.push('/user/login')
    }
  },

  computed: {
    ...mapState('user', ['user', 'token']),
    isLoggedIn() {
      return this.$q.localStorage.getItem('jwt')? true : false
    }
  },

  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: [
        {
          title: 'My Databases',
          icon: 'folder',
          link: 'https://quasar.dev'
        }
      ]
    }
  }
}
</script>
