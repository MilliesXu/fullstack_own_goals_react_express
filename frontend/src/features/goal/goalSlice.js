import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getGoalsService } from "./goalService"


const initialState = {
  goals: [],
  isSuccess: false,
  isLoading: false,
  isError: false,
  errorMessage: '',
  successMessage: ''
}

// get goals
export const getGoals = createAsyncThunk('goals/get', async (thunkAPI) => {
  try {
    return await getGoalsService()
  } catch (error) {
    if (error.response.status === 401) {
      localStorage.removeItem('user')
    }

    const message = error.response.data.errorMessage

    return thunkAPI.rejectWithValue(message);
  }
})

export const goalSlice = createSlice({
  name: 'goals',
  initialState,
  reducers: {
    resetGoals: () => initialState
  },
  extraReducers: (builder) => {
    builder
    .addCase(getGoals.pending, (state) => {
      state.isLoading = true
    })
    .addCase(getGoals.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.goals = action.payload
    })
    .addCase(getGoals.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.errorMessage = action.payload
    })
  }
})

export const { resetGoals } = goalSlice.actions
export default goalSlice.reducer
