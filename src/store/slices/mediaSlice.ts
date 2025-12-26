import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type MediaField = 'logoUri' | 'backgroundUri';

interface MediaState {
  logoUri?: string;
  backgroundUri?: string;
}

const initialState: MediaState = {};

const mediaSlice = createSlice({
  name: 'media',
  initialState,
  reducers: {
    setImage: (state, action: PayloadAction<{ field: MediaField; uri: string }>) => {
      state[action.payload.field] = action.payload.uri;
    },
    clearImages: () => initialState,
  },
});

export const { setImage, clearImages } = mediaSlice.actions;
export default mediaSlice.reducer;
