import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

export const fetchPizzas = createAsyncThunk( 'pizza/fetchPizzasStatus', async (params) => {
    const {order, category, sortBy, page} = params;
    const {data} = await axios.get(`https://63f2181d4f17278c9a1ff938.mockapi.io/items?page=${page}&limit=4&category=${category}&sortBy=${sortBy}&order=${order}`)
      return data
    }
  )

const initialState={
    items:[],
    status:'loading', // loading || success || error
}

export const pizzaSlice = createSlice({
    name: 'pizza',
    initialState,
    reducers:{
        setItems(state, action){
            state.items = action.payload
        },
    },
    extraReducers: {
        [fetchPizzas.pending]:(state)=>{
            state.status = 'loading';
            state.items = [];
        },
        [fetchPizzas.fulfilled]:(state, action)=>{
            state.items = action.payload;
            state.status = 'success'
        },
        [fetchPizzas.rejected]:(state)=>{
            state.status = 'error';
            state.items = [];
        },
    }
})

export const {setItems} = pizzaSlice.actions;

export default pizzaSlice.reducer;