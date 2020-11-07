import { createAsyncThunk } from '@reduxjs/toolkit';
import { getRecipes } from '../../api/index';

export const getAndSetRecipes = createAsyncThunk(
    'recipes',
    async () => {
        const response = await getRecipes();
        return response.data
    }
)