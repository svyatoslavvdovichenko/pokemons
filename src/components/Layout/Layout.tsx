import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import { FC } from "react";
import { Link } from "react-router-dom";

interface ILayout {
  children: React.ReactNode;
}

const Layout: FC<ILayout> = ({ children }) => (
  <Box sx={{ display: "flex", width: "100%" }}>
    <Box component="nav">
      <AppBar>
        <Container>
          <Toolbar>
            <Link to="/pokemons">
              <Typography variant="h5">Pokemons</Typography>
            </Link>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>

    <Box component="main" sx={{ p: 3, width: "100%" }}>
      {children}
    </Box>
  </Box>
);

export default Layout;
