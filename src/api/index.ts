import axios, { AxiosResponse } from "axios";

const apiUrl =
  "http://private-anon-2f450b24a2-cookbook3.apiary-proxy.com/api/v1";

export interface IRecipe {
  name: string;
  id: string;
  score: number;
  duration: number;
}

export interface IRecipeDetails {
  name: string;
  info: string;
  description: string;
  ingredients: string[];
  score: number;
  duration: number;
  id: string;
}

export interface INewRecipeRequestBody {
  name: string;
  info: string;
  description: string;
  ingredients?: string[];
  duration: number;
}

export async function getRecipes(): Promise<AxiosResponse<IRecipe[]>> {
  return axios.get(`${apiUrl}/recipes`);
}

export async function getRecipe(
  id: string
): Promise<AxiosResponse<IRecipeDetails>> {
  return axios.get(`${apiUrl}/recipes/${id}`);
}

export async function postRating(id: string, score: number) {
  return axios.post(`${apiUrl}/recipes/${id}/ratings`, { score });
}

export async function postRecipe(
  body: INewRecipeRequestBody
): Promise<AxiosResponse<IRecipeDetails>> {
  return axios.post(`${apiUrl}/recipes`, body);
}
