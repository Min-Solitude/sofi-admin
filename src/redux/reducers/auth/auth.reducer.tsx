import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { AuthState, User } from './auth.type'
import { addDoc, collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore'
import { db } from '../../../configs'
import { toast } from 'react-toastify'

const initialState: AuthState = {
    listUser: [],
    loading: false,
}

export const getAllUser = createAsyncThunk(
    'auth/getAllUser',
    async (payload: { search: string }) => {
        let userQuery;

        if (payload.search) {
            // Có search keyword
            userQuery = query(collection(db, "users"), where("phone", "==", payload.search));

        } else {
            userQuery = query(collection(db, "users"));
        }

        const userSnapshot = await getDocs(userQuery);

        const users = userSnapshot.docs.map(doc => {

            return {
                uid: doc.id,
                ...doc.data(),
            };
        }) as User[];

        return users;
    }
)

export const getAllUserVip = createAsyncThunk(
    'auth/getAllUserVip',
    async () => {
        const userQuery = query(collection(db, "users"), where("vip.isVip", "==", true));

        const userSnapshot = await getDocs(userQuery);

        const users = userSnapshot.docs.map(doc => {

            return {
                uid: doc.id,
                ...doc.data(),
            };
        }) as User[];

        return users;
    }
)

export const updateVipAccount = createAsyncThunk(
    'auth/updateVipAccount',
    async (payload: { id: string, package: string, titleNotice: string, contentNotice: string }) => {

        let expiredAt;

        if (payload.package === 'month') {
            expiredAt = new Date().getTime() + 30 * 24 * 60 * 60 * 1000;

        } else if (payload.package === 'year') {

            expiredAt = new Date().getTime() + 365 * 24 * 60 * 60 * 1000;

        }

        let createdAt = new Date().getTime();

        const userRef = doc(db, "users", payload.id);

        await updateDoc(userRef, {
            vip: {
                isVip: true,
                createdAt,
                expiredAt,
                package: payload.package,
            }
        });

        const noticeRef = collection(db, "notices");

        await addDoc(noticeRef, {
            title: payload.titleNotice,
            content: payload.contentNotice,
            createdAt: Date.now(),
            userId: payload.id,
            status: 'unread',
        });

        return true;
    }
)

export const destroyVipAccount = createAsyncThunk(
    'auth/destroyVipAccount',
    async (payload: { id: string }) => {

        const userRef = doc(db, "users", payload.id);

        await updateDoc(userRef, {
            vip: {
                isVip: false,
                createdAt: null,
                expiredAt: null,
                package: null,
            }
        });

        return true;
    }
)

const reducer = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        handleLogout: (state) => { }
    },
    extraReducers: (builder) => {
        builder.addCase(getAllUser.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getAllUser.fulfilled, (state, action) => {
            state.listUser = action.payload
            state.loading = false
        })

        builder.addCase(getAllUserVip.pending, (state) => {
            state.loading = true
        })
        builder.addCase(getAllUserVip.fulfilled, (state, action) => {
            state.listUser = action.payload
            state.loading = false
        })

        builder.addCase(updateVipAccount.pending, (state) => {
            state.loading = true
        })
        builder.addCase(updateVipAccount.rejected, (state) => {
            state.loading = false
            toast.error('Nâng cấp gói VIP thất bại!')
        })
        builder.addCase(updateVipAccount.fulfilled, (state, action) => {
            state.loading = false
            toast.success('Nâng cấp gói VIP thành công!')
        })

        builder.addCase(destroyVipAccount.pending, (state) => {
            state.loading = true
        })
        builder.addCase(destroyVipAccount.rejected, (state) => {
            state.loading = false
            toast.error('Hủy gói VIP thất bại!')
        })
        builder.addCase(destroyVipAccount.fulfilled, (state, action) => {
            state.loading = false
            toast.success('Hủy gói VIP thành công!')
        })
    }
})

export const AuthAction = reducer.actions
export const AuthReducer = reducer.reducer
