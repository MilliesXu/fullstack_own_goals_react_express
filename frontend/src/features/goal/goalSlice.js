import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { getGoalsService, createGoalService, deleteGoalService } from "./goalService"
import { reload } from '../auth/authSlice';

const initialState = {
  goals: [],
  isSuccess: false,
  isError: false,
  errorMessage: '',
  successMessage: ''
}

// get goals
export const getGoals = createAsyncThunk('goals/get', async (thunkAPI, { dispatch }) => {
  try {
    return await getGoalsService()
  } catch (error) {
    if (error.response.status === 401) {
      localStorage.removeItem('user')
      dispatch(reload({
        firstname: '',
        lastname: '',
        verified: false
      }))
    }

    const message = error.response.data.errorMessage

    return thunkAPI.rejectWithValue(message);
  }
})

// create goal
export const createGoal = createAsyncThunk('goals/post', async ( goal, { dispatch, thunkAPI }) => {
  try {
    return await createGoalService(goal)
  } catch (error) {
    if (error.response.status === 401) {
      localStorage.removeItem('user')
      dispatch(reload({
        firstname: '',
        lastname: '',
        verified: false
      }))
    }

    const message = error.response.data.errorMessage

    return thunkAPI.rejectWithValue(message);
  }
})

export const deleteGoal = createAsyncThunk('goals/delete', async (id, { dispatch, thunkAPI }) => {
  try {
    const response = await deleteGoalService(id)

    return  {
      id,
      data: response
    }
  } catch (error) {
    if (error.response.status === 401) {
      localStorage.removeItem('user')
      dispatch(reload({
        firstname: '',
        lastname: '',
        verified: false
      }))
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
    .addCase(getGoals.fulfilled, (state, action) => {
      state.isSuccess = true
      state.goals = action.payload
    })
    .addCase(getGoals.rejected, (state, action) => {
      state.isError = true
      state.errorMessage = action.payload
    })
    .addCase(createGoal.fulfilled, (state, action) => {
      state.isSuccess = true
      state.successMessage = action.payload.successMessage
      state.goals.push(action.payload.goal)
    })
    .addCase(createGoal.rejected, (state, action) => {
      state.isError = true
      state.errorMessage = action.payload
    })
    .addCase(deleteGoal.fulfilled, (state, action) => {
      state.isSuccess = true
      state.successMessage = action.payload.data.successMessage
      state.goals = state.goals.filter(goal => goal._id !== action.payload.id)
    })
    .addCase(deleteGoal.rejected, (state, action) => {
      state.isError = true
      state.errorMessage = action.payload
    })
  }
})

export const { resetGoals, resetMessage } = goalSlice.actions
export default goalSlice.reducer
