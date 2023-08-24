import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { addDoc, arrayUnion, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { toast } from 'react-toastify'
import { db, storage } from '../../../configs'
import { PostState, uploadPostPayload } from './post.type'

const initialState: PostState = {
    isLoading: false,
    listPost: []
}

export const uploadPostOnFirebase = createAsyncThunk(
    'post/uploadPostOnFirebase',
    async (payload: uploadPostPayload) => {
        const docRef = await addDoc(collection(db, 'posts'), {
            caption: payload.caption,
            timestamp: serverTimestamp(),
            background: payload.background,
            avatar: payload.avatar,
            nickName: payload.nickName
        })

        await Promise.all(
            payload.selectedImages.map((image: any) => {
                const imageRef = ref(storage, `posts/${docRef.id}/${image.path}`)
                uploadBytes(imageRef, image, {}).then(async () => {
                    const downloadURL = await getDownloadURL(imageRef)
                    await updateDoc(doc(db, 'posts', docRef.id), {
                        images: arrayUnion(downloadURL)
                    })
                })
            })
        )

        return
    }
)

export const likePost = createAsyncThunk('post/likePost', async (payload: { id: string; uid: string }) => {
    await updateDoc(doc(db, 'posts', payload.id), {
        likes: arrayUnion(payload.uid)
    })

    return
})

export const commentPost = createAsyncThunk(
    'post/commentPost',
    async (payload: { id: string; comment: string; avatar: string; displayName: string }) => {
        await updateDoc(doc(db, 'posts', payload.id), {
            comments: arrayUnion({
                comment: payload.comment,
                avatar: payload.avatar,
                displayName: payload.displayName
            })
        })

        return
    }
)

const reducer = createSlice({
    name: 'post',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Upload post
        builder.addCase(uploadPostOnFirebase.fulfilled, (state) => {
            localStorage.setItem('Posted', 'true')
            toast.success('Đăng bài thành công')
        })
    }
})

export const PostAction = reducer.actions
export const PostReducer = reducer.reducer
