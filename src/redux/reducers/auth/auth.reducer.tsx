import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AuthPayload, AuthState } from './auth.type'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { toast } from 'react-toastify'
import history from '../../store/history'
import { auth, db, provider, storage } from '../../../configs'
import { doc, setDoc } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

const initialState: AuthState = {
    accessToken: '',
    account: {
        uid: '',
        displayName: '',
        photoURL: '',
        email: '',
        member: false
    }
}

// REGISTER
export const authRegister = createAsyncThunk('auth/authRegister', async (payload: AuthPayload) => {
    const { email, password } = payload

    const { user } = await createUserWithEmailAndPassword(auth, email, password)

    return user
})

// LOGIN WITH ACCOUNT
export const authLoginWithAccount = createAsyncThunk('auth/authLoginWithAccount', async (payload: AuthPayload) => {
    const { email, password } = payload

    const { user } = await signInWithEmailAndPassword(auth, email, password)

    return user
})

// LOGIN WITH GOOGLE
export const authLoginWithGoogle = createAsyncThunk('auth/authLoginWithGoogle', async () => {
    const { user } = await signInWithPopup(auth, provider)

    return user
})

// UPDATE DISPLAY NAME
export const authUpdateDisplayName = createAsyncThunk('auth/authUpdateDisplayName', async (payload: string) => {

    const user = auth.currentUser

    if (user) {
        await setDoc(doc(db, 'users', user.uid), {
            displayName: payload
        }, { merge: true })
    }

    return payload

})

// UPDATE PHOTO URL
export const authUpdatePhotoURL = createAsyncThunk('auth/authUpdatePhotoURL', async (payload: any) => {
    const user = auth.currentUser
    if (user) {
        const imageRef = ref(storage, `users/${user.uid}/${payload.path}`)
        await uploadBytes(imageRef, payload, {})
        const downloadURL = await getDownloadURL(imageRef)
        await setDoc(doc(db, 'users', user.uid), {
            photoURL: downloadURL
        }, { merge: true })

        return downloadURL
    }
})




const reducer = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        handleLogout: (state: AuthState) => {
            state.accessToken = ''
            state.account = {
                uid: '',
                displayName: '',
                photoURL: '',
                email: '',
                member: false
            }
            history.push('/auth')
        }
    },
    extraReducers: (builder) => {
        // REGISTER
        builder.addCase(authRegister.rejected, () => {
            toast.error('Đăng ký thất bại')
        })
        builder.addCase(authRegister.fulfilled, () => {
            toast.success('Đăng ký thành công')

        })

        // LOGIN WITH ACCOUNT
        builder.addCase(authLoginWithAccount.rejected, () => {
            toast.error('Đăng nhập thất bại')
        })
        builder.addCase(authLoginWithAccount.fulfilled, (state, action: any) => {
            state.accessToken = action.payload.accessToken

            state.account = {
                uid: action.payload.uid,
                displayName: action.payload.displayName,
                photoURL: action.payload.photoURL,
                email: action.payload.email,
                member: action.payload.member
            }

            toast.success('Đăng nhập thành công')
            history.push('/')
        })

        // LOGIN WITH GOOGLE
        builder.addCase(authLoginWithGoogle.rejected, () => {
            toast.error('Đăng nhập thất bại')
        })
        builder.addCase(authLoginWithGoogle.fulfilled, (state, action: any) => {
            state.accessToken = action.payload.accessToken

            state.account = {
                uid: action.payload.uid,
                displayName: action.payload.displayName,
                photoURL: action.payload.photoURL,
                email: action.payload.email,
                member: action.payload.member
            }

            toast.success('Đăng nhập thành công')
            history.push('/')
        })

        // UPDATE DISPLAY NAME
        builder.addCase(authUpdateDisplayName.rejected, () => {
            toast.error('Cập nhật thất bại')
        })
        builder.addCase(authUpdateDisplayName.fulfilled, (state, action: any) => {
            state.account.displayName = action.payload
            toast.success('Cập nhật thành công')
        })

        // UPDATE PHOTO URL
        builder.addCase(authUpdatePhotoURL.rejected, () => {
            toast.error('Cập nhật thất bại')
        })
        builder.addCase(authUpdatePhotoURL.fulfilled, (state, action: any) => {
            state.account.photoURL = action.payload
            toast.success('Cập nhật thành công')
        })
    }
})

export const AuthAction = reducer.actions
export const AuthReducer = reducer.reducer
