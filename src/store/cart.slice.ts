// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// import { loadState } from "./storage";
// import { PREFIX } from "../helpers/API";
// import type { LoginResponse } from "../interfaces/auth.interface";
// import axios, { AxiosError } from "axios";
// import type { Profile } from "../interfaces/user.interface";
// import type { RootState } from "./store";

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export const JWT_PERSISTENT_STATE = 'userData';

export interface CartItem{
    id: number,
    count: number
}




export interface CartState{
    items: CartItem[]
}

const initialState: CartState = {
    items: []
}

export const CartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        add: (state, action: PayloadAction<number>) => {
            const existedItem = state.items.find(i => i.id === action.payload);
            if(!existedItem){
                state.items.push({id: action.payload, count: 1})
                return;
            }
            state.items.map(i => {
                if(i.id === action.payload){
                    i.count += 1;
                }
                return i;
            })
            
        }
    }
})

export default CartSlice.reducer;

//изменение состояния
export const CartAction = CartSlice.actions;