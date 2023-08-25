import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ScreenState } from './screen.type'

const initialState: ScreenState = {
    background: true,
    chooseBackground: 1
}

export const changeBackground = createAsyncThunk(
    'screen/changeBackground', (payload: boolean) => {
        return payload
    }
)

export const chooseBackground = createAsyncThunk(
    'screen/chooseBackground', (payload: number) => {
        return payload
    })

const reducer = createSlice({
    name: 'screen',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(changeBackground.fulfilled, (state, action) => {
            state.background = action.payload   
        })
        builder.addCase(chooseBackground.fulfilled, (state, action) => {
            state.chooseBackground = action.payload
        })
    }
})

export const ScreenAction = reducer.actions
export const ScreenReducer = reducer.reducer
