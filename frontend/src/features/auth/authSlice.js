import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { loginService, logoutService, registerService, verifyService } from './authService'

const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  user: user ? user : {
    firstname: '',
    lastname: '',
    verified: false
  },
  isLoading: false,
  isError: false,
  isSuccess: false,
  successMessage: '',
  errorMessage: '',
}

// login user
export const login = createAsyncThunk('auth/login', async (user, thunkAPI) => {
  try {
    return await loginService(user)
  } catch (error) {
    const message = error.response.data.errorMessage

    return thunkAPI.rejectWithValue(message);
  }
})

// register user
export const register = createAsyncThunk('auth/register', async (user, thunkAPI) => {
  try {
    return await registerService(user)
  } catch (error) {
    const message = error.response.data.errorMessage

    return thunkAPI.rejectWithValue(message);
  }
})

export const logout = createAsyncThunk('auth/logout', async (thunkAPI) => {
  try {
    return await logoutService()
  } catch (error) {
    const message = error.response.data.errorMessage

    return thunkAPI.rejectWithValue(message);
  }
})

// verify user
export const verify = createAsyncThunk('auth/verify', async (user, thunkAPI) => {
  try {
    return await verifyService(user)
  } catch (error) {
    const message = error.response.data.errorMessage

    return thunkAPI.rejectWithValue(message);
  }
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state) => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.user = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = true
        state.errorMessage = action.payload
        state.user = user ? user : {
          firstname: '',
          lastname: '',
          verified: false
        }
      })
      .addCase(register.pending, (state) => {
        state.isLoading = true
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.successMessage = action.payload
        state.errorMessage = ''
        state.user = user ? user : {
          firstname: '',
          lastname: '',
          verified: false
        }
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false
        state.isSuccess = false
        state.isError = true
        state.errorMessage = action.payload
        state.user = user ? user : {
          firstname: '',
          lastname: '',
          verified: false
        }
      })
      .addCase(verify.pending, (state) => {
        state.isLoading = true
      })
      .addCase(verify.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.user = action.payload
        state.successMessage = ''
      })
      .addCase(verify.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.errorMessage = action.payload
        state.successMessage = ''
        state.user = user ? user : {
          firstname: '',
          lastname: '',
          verified: false
        }
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.isError = false
        state.user = user ? user : {
          firstname: '',
          lastname: '',
          verified: false
        }
        state.successMessage = action.payload
      })
      .addCase(logout.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.isSuccess = false
        state.errorMessage = action.payload
        state.successMessage = ''
      })
  }
})

export const { reset } = authSlice.actions
export default authSlice.reducer
