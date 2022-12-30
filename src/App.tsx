import { createTheme, ThemeProvider } from "@mui/material";
import { FC } from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Pokemons from "./components/Pokemons/Pokemons";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

const App: FC = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <Layout>
        <Routes>
          <Route path="/pokemons" element={<Pokemons />} />
          <Route path="/pokemons/:id" element={<h2>frgeer</h2>} />
          <Route path="*" element={<Pokemons />} />
        </Routes>
      </Layout>
    </ThemeProvider>
  );
};

export default App;
