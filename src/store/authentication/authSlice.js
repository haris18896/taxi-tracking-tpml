import { createSlice } from '@reduxjs/toolkit'
import { login } from './authAction'

// Reducers
export const AuthReducer = createSlice({
  name: 'auth',
  initialState: {
    loginInProgress: false,
    user: {}
  },
  reducers: {
    handleLogout: state => {
      state.user = {}
      localStorage.clear()
    }
  },
  extraReducers: builder => {
    builder
      .addCase(login.pending, state => {
        state.loginInProgress = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loginInProgress = false
        state.user = action.payload.data
        state.error = action.payload.errors
      })
      .addCase(login.rejected, (state, action) => {
        state.loginInProgress = false
        state.user = null
      })
  }
})

export const { handleLogout } = AuthReducer.actions

export default AuthReducer.reducer
