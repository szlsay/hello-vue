
export default {
  state: {
    name: 'zhangsan'
  },
  mutations: {
    updateName(state, payload) {
      state.name = payload
    }
  },
  getters: {
    fullname(state) {
      return state.name + '11111'
    },
    fullname2(state, getters) {
      return getters.fullname + '2222'
    },
    fullname3(state, getters, rootState) {
      return getters.fullname2 + rootState.counter
    }
  },
  actions: {
    // aUpdateName(context, payload) {
    //   console.log(context);
    //   console.log(payload);
    //   setTimeout(() => {
    //     context.commit('updateName', 'st')
    //     resolve("finish")
    //   }, 3000)
    // }

    aUpdateName(context, payload) {
      console.log(context);
      console.log(payload);
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          context.commit('updateName', 'st')
          resolve("finish")
        }, 3000)
      })
    }
  }
}
