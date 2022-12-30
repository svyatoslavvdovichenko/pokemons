import { createTheme, ThemeProvider } from "@mui/material";
import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Pokemon from "./Page/Pokemon/Pokemon";
import Pokemons from "./Page/Pokemons/Pokemons";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const App: FC = () => (
  <ThemeProvider theme={darkTheme}>
    <Layout>
      <Routes>
        <Route path="/pokemons" element={<Pokemons />} />
        <Route path="/pokemons/:id" element={<Pokemon />} />
        <Route path="*" element={<Pokemons />} />
      </Routes>
    </Layout>
  </ThemeProvider>
);

export default App;
