import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getProfileService, updateProfileService } from "./profileService"

const initialState = {
  profile: {
    firstname: '',
    lastname: '',
    email: ''
  },
  isLoading: false,
  isSuccess: false,
  isError: false,
  errorMessage: ''
}

// get profile
export const getProfile = createAsyncThunk('profile/get', async (thunkAPI) => {
  try {
    return await getProfileService()
  } catch (error) {
    
    if (error.response.status === 401) {
      localStorage.removeItem('user')
    }

    const message = error.response.data.errorMessage

    return thunkAPI.rejectWithValue(message);
  }
})

// update profile
export const updateProfile = createAsyncThunk('profile/update', async (user, thunkAPI) => {
  try {
    return await updateProfileService(user)
  } catch (error) {
    const message = error.response.data.errorMessage

    return thunkAPI.rejectWithValue(message);
  }
})

export const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    resetProfile: () => initialState
  },
  extraReducers: (builder) => {
    builder
    .addCase(getProfile.pending, (state) => {
      state.isLoading = true
      state.errorMessage = ''
    })
    .addCase(getProfile.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.profile = action.payload
    })
    .addCase(getProfile.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.errorMessage = action.payload
    })
    .addCase(updateProfile.pending, (state) => {
      state.isLoading = true
    })
    .addCase(updateProfile.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.profile = action.payload
    })
    .addCase(updateProfile.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.errorMessage = action.payload
    })
  }
})

export const { resetProfile } = profileSlice.actions
export default profileSlice.reducer
