import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  categoryId: 0,
  page: 1,
  sort:{ name:'популярности', sortProperty:'rating'}
}

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategoryId(state, action){
        state.categoryId = action.payload;
    },
    setSortType(state, action){
        state.sort = action.payload
    },
    setPage(state, action){
      state.page = action.payload
    },
    setFilters(state, action){
      state.page = Number(action.payload.page);
      state.sort = action.payload.sort
      state.categoryId = Number(action.payload.categoryId);
    }
  },
})

export const {setCategoryId, setSortType, setPage, setFilters} = filterSlice.actions;

export default filterSlice.reducer;