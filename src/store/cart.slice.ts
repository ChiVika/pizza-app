
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { loadState } from "./storage";


export const СART_PERSISTENT_STATE = 'cartData';

export interface CartItem{
    id: number,
    count: number
}


export interface CartState{
    items: CartItem[]
}
const loadedState = loadState<CartState>(СART_PERSISTENT_STATE);
const initialState: CartState = {
    items: (loadedState && Array.isArray(loadedState.items)) ? loadedState.items : []
}

export const CartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        clear: (state) => {
            state.items = [];
        },
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
        },
        remove: (state, action: PayloadAction<number>) => {
            const existItem = state.items.find(i => i.id === action.payload);
            if(!existItem){
                return;
            }
            if(existItem.count === 1){
                state.items = state.items.filter(i => i.id !== action.payload);
            }
            else{
                state.items.map(i => {
                    if(i.id === action.payload){
                        i.count -= 1;
                    }
                    return i;
                })
                return;
            }
                

            
        },
        delete: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter(i => i.id !== action.payload);
        }

    }
})

export default CartSlice.reducer;

//изменение состояния
export const CartAction = CartSlice.actions;