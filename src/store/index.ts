import { configureStore } from "@reduxjs/toolkit";
import pokemonsReducer from "./pokemons/pokemonsSlice";

const store = configureStore({
  reducer: {
    pokemons: pokemonsReducer,
  }
})

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;