import { createSlice } from '@reduxjs/toolkit'
import { PostState } from './post.type'

const initialState: PostState = {}

const reducer = createSlice({
    name: 'post',
    initialState,
    reducers: {
        startPost: (state) => {}
    },
    extraReducers: (builder) => {}
})

export const PostAction = reducer.actions
export const PostReducer = reducer.reducer
