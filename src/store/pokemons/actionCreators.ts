import { IPokemon } from "./pokemonsSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

interface IResponcePokemon {
  count: number;
  next: string | null;
  previous: string | null;
  results: Array<{ name: string; url: string }>;
}

interface IQuery {
  rowsPerPage: number;
  page: number;
}

export const fetchPokemons = createAsyncThunk(
  "pokemons/fetchAll",
  async (query: IQuery, thunkApi) => {
    try {
      const pokemonsList = await axios.get<IResponcePokemon>(
        `https://pokeapi.co/api/v2/pokemon?limit=${query.rowsPerPage}&offset=${
          query.rowsPerPage * query.page
        }`
      );
      let pokemons: IPokemon[] = [];
      for (let index = 0; index < pokemonsList.data.results.length; index++) {
        const pokemon = await axios.get(pokemonsList.data.results[index].url);
        pokemons.push(pokemon.data);
      }

      return {
        pokemons,
        count: pokemonsList.data.count,
        next: pokemonsList.data.next,
        previous: pokemonsList.data.previous,
      };
    } catch (error) {
      return;
    }
  }
);