import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { loginService, logoutService, registerService, verifyService, requestResetPasswordService, resetPasswordService } from './authService'

const user = JSON.parse(localStorage.getItem('user'))

const initialState = {
  user: user ? user : {
    firstname: '',
    lastname: '',
    verified: false
  },
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

// reload user
export const reload = createAsyncThunk('auth/reload', async (user, thunkAPI) => {
  try {
    return user
  } catch (error) {
    const message = error.response.data.errorMessage

    return thunkAPI.rejectWithValue(message);
  }
})


// Request change password
export const requestChangePassword = createAsyncThunk('auth/requestChangePassword', async (data, thunkAPI) => {
  try {
    return await requestResetPasswordService(data)
  } catch (error) {
    const message = error.response.data.errorMessage

    return thunkAPI.rejectWithValue(message);
  }
})

// Reset Password
export const resetPassword = createAsyncThunk('auth/resetPassword', async (data, thunkAPI) => {
  try {
    return await resetPasswordService(data)
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
      .addCase(login.fulfilled, (state, action) => {
        state.isSuccess = true
        state.isError = false
        state.user = action.payload
      })
      .addCase(login.rejected, (state, action) => {
        state.isSuccess = false
        state.isError = true
        state.errorMessage = action.payload
        state.user = user ? user : {
          firstname: '',
          lastname: '',
          verified: false
        }
      })
      .addCase(register.fulfilled, (state, action) => {
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
        state.isSuccess = false
        state.isError = true
        state.errorMessage = action.payload
        state.user = user ? user : {
          firstname: '',
          lastname: '',
          verified: false
        }
      })
      .addCase(verify.fulfilled, (state, action) => {
        state.isSuccess = true
        state.isError = false
        state.user = action.payload
        state.successMessage = ''
      })
      .addCase(verify.rejected, (state, action) => {
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
      .addCase(logout.fulfilled, (state, action) => {
        state.isSuccess = true
        state.isError = false
        state.user = {
          firstname: '',
          lastname: '',
          verified: false
        }
        state.successMessage = action.payload
      })
      .addCase(logout.rejected, (state, action) => {
        state.isError = true
        state.isSuccess = false
        state.errorMessage = action.payload
        state.successMessage = ''
      })
      .addCase(reload.fulfilled, (state, action) => {
        state.user = action.payload
      })
      .addCase(reload.rejected, (state, action) => {
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
      .addCase(requestChangePassword.fulfilled, (state, action) => {
        state.isSuccess = true
        state.successMessage = action.payload
      })
      .addCase(requestChangePassword.rejected, (state, action) => {
        state.isError = true
        state.errorMessage = action.payload
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isSuccess = true
        state.successMessage = action.payload
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.isError = true
        state.errorMessage = action.payload
      })
  }
})

export const { reset } = authSlice.actions
export default authSlice.reducer
