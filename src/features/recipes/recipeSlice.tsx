import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IRecipe } from "../../api";
import { RootState } from "../../store";

import { getAndSetRecipes } from "./actions";

export interface IRecipesState {
  recipes: IRecipe[];
  loading: boolean;
  error: boolean;
  newCreatedRecipe: boolean;
}

const initialState: IRecipesState = {
  recipes: [],
  loading: true,
  error: false,
  newCreatedRecipe: false,
};

const recipeSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {
    setNewCreatedRecipe: (state, { payload }: PayloadAction<boolean>) => {
      state.newCreatedRecipe = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(
      getAndSetRecipes.fulfilled,
      (state: IRecipesState, { payload }: PayloadAction<IRecipe[]>) => {
        state.recipes = payload;
        state.loading = false;
      }
    );
    builder.addCase(getAndSetRecipes.rejected, (state, action) => {
      state.loading = false;
      state.error = true;
    });
  },
});

export const { setNewCreatedRecipe } = recipeSlice.actions;

export const recipesSelector = (state: RootState) => state.cookbook;

export default recipeSlice;
