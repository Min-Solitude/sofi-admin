import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { BackgroundState } from './background.type';
import { collection, doc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import { db, storage } from '../../../configs';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { toast } from 'react-toastify';

const initialState: BackgroundState = {
    background: [],
    loading: false
}

export const getBackground = createAsyncThunk(
    'background/getBackground',
    async () => {
     try {
        const backgroundsRef = collection(db, 'background');

        // Lấy tất cả documents trong collection 
        const snapshot = await getDocs(backgroundsRef);
        
        // Duyệt qua các documents
        let backgrounds: any = [];
        snapshot.forEach(doc => {
          // Thêm mỗi document vào mảng kết quả
          backgrounds.push({ 
            id: doc.id,
            ...doc.data()
          }) 
        });
        
        // Trả về mảng chứa data của các document
        return backgrounds;
     } catch (error) {
            console.log('error', error);
     }
    }
)

export const updateBackground = createAsyncThunk(
    'background/updateBackgroundFree',
    async (payload: any,) => {
     try {
        const noticeRef = collection(db, "background");
        const docBackground = await getDoc(doc(noticeRef, payload.name));

        const storageRefDay = ref(storage, `backgrounds/${payload.name}/${payload.name}-day`);
        await uploadBytes(storageRefDay, payload.backgroundDay);
        const thumbnailDay = await getDownloadURL(storageRefDay);

        const storageRefNight = ref(storage, `backgrounds/${payload.name}/${payload.name}-night`);
        await uploadBytes(storageRefNight, payload.backgroundNight);
        const thumbnailNight = await getDownloadURL(storageRefNight);
        

        if (docBackground.exists()) {
            await updateDoc(doc(noticeRef, payload.name), {
                name: payload.name,
                status: true,
                type : 'free',
                backgroundDay : thumbnailDay,
                backgroundNight : thumbnailNight
              });
        } else {
            await setDoc(doc(noticeRef, payload.name), {
                name: payload.name,
                status: true,
                type : 'free',
                backgroundDay : thumbnailDay,
                backgroundNight : thumbnailNight
              });
        }

        return {
            name: payload.name,
            status: true,
            type : 'free',
            backgroundDay : thumbnailDay,
            backgroundNight : thumbnailNight
        };
     } catch (error) {
            console.log('error', error);
     }
    }
)

const reducer = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // get
        builder.addCase(getBackground.fulfilled, (state, action) => {
            if (action.payload) {
                
                state.background = action.payload;                
            }
        })

        // update
        builder.addCase(updateBackground.rejected, (state, action) => {
            toast.error('Upload background free failed');
            state.loading = false;
        })
        builder.addCase(updateBackground.pending, (state, action) => {
            state.loading = true;
        })
        builder.addCase(updateBackground.fulfilled, (state, action) => {
            toast.success('Upload background free successfully');
            state.loading = false;
        })
    }
})

export const BackgroundAction = reducer.actions
export const BackgroundReducer = reducer.reducer
