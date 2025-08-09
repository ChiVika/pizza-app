import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { loadState } from "./storage";

export const JWT_PERSISTENT_STATE = 'userData';

export interface  UserPersistentState{
    'jwt': string | null
}

export interface UserState{
    'jwt': string | null
}

const initialState: UserState = {
    jwt: loadState<UserPersistentState>(JWT_PERSISTENT_STATE)?.jwt ?? null
}


export const UserSlice = createSlice({
    name: 'user',
    initialState: initialState,
    reducers: {
        addJwt: (state, action: PayloadAction<string>) => {
            state.jwt = action.payload
        },
        logout: (state) => {
            state.jwt = null
        }
    }
})

export default UserSlice.reducer;

//изменение состояния
export const UserAction = UserSlice.actions;