//корневое хранилище
import { configureStore } from "@reduxjs/toolkit";
import { JWT_PERSISTENT_STATE, UserSlice } from "./user.slice";
import { saveState } from "./storage";
import { CartSlice } from "./cart.slice";


//кофигурируем хранилище
export const store = configureStore({
    reducer: {
        'user': UserSlice.reducer,
        'cart': CartSlice.reducer
    }
})

store.subscribe(() => {
    saveState({jwt: store.getState().user.jwt}, JWT_PERSISTENT_STATE)
})

//типизация состояния хранилища
export type RootState = ReturnType<typeof store.getState>

//типизация возможных действий
export type AppDispatch = typeof store.dispatch