import { configureStore } from '@reduxjs/toolkit'

import recipeSlice from './features/recipes/recipeSlice';

const store = configureStore({
  reducer: {
      cookbook: recipeSlice.reducer,
  },
})
export type RootState = ReturnType<typeof store.getState>

export default store;
