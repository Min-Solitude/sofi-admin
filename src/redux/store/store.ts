import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import {
    FLUSH,
    PAUSE,
    PERSIST,
    PURGE,
    PersistConfig,
    REGISTER,
    REHYDRATE,
    persistReducer,
    persistStore
} from 'redux-persist'
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2'
import storage from 'redux-persist/lib/storage'
import history from './history'
import { AuthReducer } from '../reducers/auth/auth.reducer'
import { PostReducer } from '../reducers/post/post.reducer'

const rootReducer = combineReducers({
    router: connectRouter(history),
    auth: AuthReducer,
    post: PostReducer
})

type RootState = ReturnType<typeof rootReducer>

const persistConfig: PersistConfig<RootState> = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel2
}

const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
            ignoreActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }).concat(routerMiddleware(history))
})

export const persistor = persistStore(store)

export default store
