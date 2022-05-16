import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getProfileService } from "./profileService"

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
  }
})

export const { resetProfile } = profileSlice.actions
export default profileSlice.reducer
