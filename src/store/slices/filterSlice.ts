import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface FilterState {
  category: string;
  yearMin: string;
  yearMax: string;
  priceMin: string;
  priceMax: string;
  location: string;
  country: string;
}

const initialState: FilterState = {
  category: '',
  yearMin: '',
  yearMax: '',
  priceMin: '',
  priceMax: '',
  location: '',
  country: '',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter: (state, action: PayloadAction<Partial<FilterState>>) => {
      return { ...state, ...action.payload };
    },
    clearFilters: () => initialState,
  },
});

export const { setFilter, clearFilters } = filterSlice.actions;
export default filterSlice.reducer;
