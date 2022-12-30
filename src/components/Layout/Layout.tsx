import {
  AppBar,
  Container,
  Toolbar,
  Typography,
} from "@mui/material";
import { FC } from "react";
import { Link } from "react-router-dom";

interface ILayout {
  children: React.ReactNode;
}

const Layout: FC<ILayout> = ({ children }) => {
  return (
    <>
      <AppBar position="fixed">
        <Container fixed>
          <Toolbar>
            <Link to="/pokemons">
              <Typography variant="h5">Pokemons</Typography>
            </Link>
          </Toolbar>
        </Container>
      </AppBar>

      {children}
    </>
  );
};

export default Layout;
