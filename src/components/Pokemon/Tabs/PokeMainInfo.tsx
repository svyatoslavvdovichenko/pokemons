import { Container } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import { FC } from "react";
import { IPokemon } from "../../../store/pokemons/pokemonsSlice";

interface IMainPokemonInfo {
  pokemon: IPokemon;
}
export const PokeMainInfo: FC<IMainPokemonInfo> = ({ pokemon }) => (
  <Container>
    <Grid></Grid>
  </Container>
);
