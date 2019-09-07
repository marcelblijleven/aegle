const ADD_SNACKBAR = 'add:snackbar'

const SnackBar = {
  state: {
    show: false,
    color: null,
    text: null,
  },
  mutations: {
    [ADD_SNACKBAR](state, snackbar) {
      state.show = true
      state.color = snackbar.success ? 'success' : 'error'
      state.text = snackbar.text
    }
  }
}

export default SnackBar
