import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { MusicState } from './music.type'

const initialState: MusicState = {
    music: 0,
    status: false
}

export const startMusic = createAsyncThunk(
    'music/startMusic',
    async (payload: boolean) => {
        return payload
    }
)

export const changeMusic = createAsyncThunk(
    'music/changeMusic',
    async (payload: number) => {
        return payload
    }
)





const reducer = createSlice({
    name: 'music',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(startMusic.fulfilled, (state, action) => {
            state.status = action.payload
        })
        builder.addCase(changeMusic.fulfilled, (state, action) => {
            state.music = action.payload
        }
        )
    }
})

export const MusicAction = reducer.actions
export const MusicReducer = reducer.reducer
