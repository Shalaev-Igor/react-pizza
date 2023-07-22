import { configureStore } from '@reduxjs/toolkit'
import filterReducer from './slices/filterSlice'
import CartSlice from './slices/CartSlice'
import pizzasSlice from './slices/pizzasSlice'

export const store = configureStore({
  reducer: {
    filter: filterReducer,
    cart: CartSlice,
    pizza: pizzasSlice,
  },
})