import { Image } from '@mui/icons-material';
import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useTypedSelector } from '../../hooks';

interface ILayout {
  children: React.ReactNode;
}

const StyledImage = styled.img`
  position: relative;
  top: -5px;
  left: 0px;
  background-size: cover;
`;

const COUNT_POKEMON = 1154;

const Layout: FC<ILayout> = ({ children }) => {
  const { countGuessed } = useTypedSelector(state => state.game);

  const count = Array.from(new Set(countGuessed)).length;

  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <Box component='nav'>
        <AppBar>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Link to='/pokemons'>
              <Typography variant='h5'>Pokemons</Typography>
            </Link>

            <div>
              <Typography>{`You know ${count} of ${COUNT_POKEMON} pokemons`}</Typography>

              <Typography>You rang:</Typography>
            </div>
          </Toolbar>
        </AppBar>
      </Box>

      <Box component='main' sx={{ p: 3, width: '100%' }}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
