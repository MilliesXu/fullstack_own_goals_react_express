import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getGoalsService, createGoalService } from "./goalService"


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

// create goal
export const createGoal = createAsyncThunk('goals/post', async (goal, thunkAPI) => {
  try {
    return await createGoalService(goal)
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
    resetGoals: () => initialState,
    resetMessage: (state) => {
      state.errorMessage = ''
      state.successMessage = ''
    }
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
    .addCase(createGoal.pending, (state) => {
      state.isLoading = true
    })
    .addCase(createGoal.fulfilled, (state, action) => {
      state.isLoading = false
      state.isSuccess = true
      state.successMessage = action.payload.successMessage
      state.goals.push(action.payload.goal)
    })
    .addCase(createGoal.rejected, (state, action) => {
      state.isLoading = false
      state.isError = true
      state.errorMessage = action.payload
    })
  }
})

export const { resetGoals, resetMessage } = goalSlice.actions
export default goalSlice.reducer
