import { fetchPokemon, fetchPokemons } from "./actionCreators";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IPokemon {
  id: string;
  name: string;
  sprites: {
    front_default: string;
    back_default: string;
    back_shiny: string;
    front_shiny: string;
    other: {
      home: { front_default: string; front_shiny: string };
      dream_world: { front_default: string };
    };
  };
  types: [
    {
      type: {
        name: string;
      };
    }
  ];
  weight: number;
  height: number;
}

interface IPokemonsState {
  pokemons: {
    count: number;
    next: string;
    previous: string;
    pokemons: IPokemon[] | [];
    loading: boolean;
  };
  currentPokemon: {
    pokemon: IPokemon;
    isLoading: boolean;
  };
}

const initialState: IPokemonsState = {
  pokemons: {
    count: 0,
    next: "",
    previous: "",
    pokemons: [],
    loading: false,
  },
  currentPokemon: {
    pokemon: {} as IPokemon,
    isLoading: false,
  },
};

const pokemonsSlice = createSlice({
  name: "pokemons",
  initialState,
  reducers: {},
  extraReducers: {
    [fetchPokemons.fulfilled.type]: (state, action: PayloadAction<any>) => {
      state.pokemons.loading = false;
      state.pokemons.count = action.payload.count;
      state.pokemons.pokemons = action.payload.pokemons;
    },
    [fetchPokemons.pending.type]: (state) => {
      state.pokemons.loading = true;
    },
    [fetchPokemons.rejected.type]: (state) => {
      state.pokemons.loading = false;
    },

    [fetchPokemon.fulfilled.type]: (state, action: PayloadAction<IPokemon>) => {
      state.currentPokemon.isLoading = false;
      state.currentPokemon.pokemon = action.payload;
    },
    [fetchPokemon.pending.type]: (state) => {
      state.currentPokemon.isLoading = true;
    },
    [fetchPokemon.rejected.type]: (state) => {
      state.currentPokemon.isLoading = false;
    },
  },
});

export default pokemonsSlice.reducer;
