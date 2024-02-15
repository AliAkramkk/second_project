import { configureStore, combineReducers } from "@reduxjs/toolkit"
import authSlice from "./authReducer";
import { persistStore, persistReducer } from 'redux-persist'
import storage from "redux-persist/lib/storage";


const authPersitConfig = {
  key: 'auth',
  storage
}

const persistedAuthReducer = persistReducer(authPersitConfig, authSlice)

const rootReducer = combineReducers({
  auth: persistedAuthReducer
})

export const store = configureStore({
  reducer: rootReducer
})

export const persistor = persistStore(store)
