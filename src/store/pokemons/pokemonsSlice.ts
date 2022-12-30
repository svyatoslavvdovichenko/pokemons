import { fetchPokemons } from "./actionCreators";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IPokemon {
  id: string;
  name: string;
  sprites: {
    front_default: string;
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
  currentPokemon: IPokemon | null;
}

const initialState: IPokemonsState = {
  pokemons: {
    count: 0,
    next: "",
    previous: "",
    pokemons: [],
    loading: false,
  },
  currentPokemon: null,
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
  },
});

export default pokemonsSlice.reducer;
