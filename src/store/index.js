import Vue from 'vue'
import Vuex from 'vuex'
import database from './database'
import user from './users'
import table from './tables'
import job from './jobs'
import data_export from './data_export'
import remotedata from './remotedata'
import createPersistedState from "vuex-persistedstate";


// import example from './module-example'

Vue.use(Vuex)


/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({

    state:{
      name: null
    },
    getters:{
      getName(state) {
        return state.name
      }
    },
    actions:{
      clearState({ dispatch }){
        dispatch('database/setActiveDatabase')
      }
    },
    modules: {
      database,
      user,
      table,
      job,
      data_export,
      remotedata
    },
    plugins: [createPersistedState()],

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
