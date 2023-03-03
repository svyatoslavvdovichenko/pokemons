import { AppBar, Box, Toolbar, Typography } from '@mui/material';
import { FC, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { useTypedSelector } from '../../hooks';

interface ILayout {
  children: ReactNode;
}

const MAX_POKEMON_COUNT = 1154;

const RANGS = [
  {
    key: 0,
    condition: (countCatching: number) => countCatching === 0,
    rang: 'Catch some 1 pokemon',
    prize: 'https://cdn-icons-png.flaticon.com/512/5372/5372351.png',
  },
  {
    key: 1,
    condition: (countCatching: number) =>
      countCatching >= 1 && countCatching < 10,
    rang: 'Beginner',
    prize:
      'https://img.game8.co/3413658/001ecd4f3f61e5a6633f64731cf0df40.png/show',
  },
  {
    key: 2,
    condition: (countCatching: number) =>
      countCatching >= 10 && countCatching < 25,
    rang: 'Great',
    prize:
      'https://img.game8.co/3413659/9aa71ce40aaf0290d070ddbf67ada1e7.png/show',
  },
  {
    key: 3,
    condition: (countCatching: number) =>
      countCatching >= 25 && countCatching < 75,
    rang: 'Expert',
    prize:
      'https://img.game8.co/3413656/438ef381423e31dc3f3aac88f1972294.png/show',
  },
  {
    key: 4,
    condition: (countCatching: number) =>
      countCatching >= 75 && countCatching < 150,
    rang: 'Veteran',
    prize:
      'https://img.game8.co/3413660/5d6827ef98618ca3c751ec1f44cb0e45.png/show',
  },
  {
    key: 5,
    condition: (countCatching: number) =>
      countCatching >= 150 && countCatching < 250,
    rang: 'Ultra',
    prize:
      'https://img.game8.co/3413657/74967eb7863b2f1df0536f5d271555a7.png/show',
  },
  {
    key: 6,
    condition: (countCatching: number) => countCatching >= 250,
    rang: 'Master',
    prize:
      'https://img.game8.co/3413661/d2c5afc15f91c186933d635edb020f6d.png/show',
  },
];

const Layout: FC<ILayout> = ({ children }) => {
  const { countGuessed } = useTypedSelector(state => state.game);

  const count = Array.from(new Set(countGuessed)).length;

  const getCurrentRang = () =>
    RANGS.find(rang => rang.condition(count)) ?? null;

  return (
    <Box sx={{ display: 'flex', width: '100%' }}>
      <Box component="nav">
        <AppBar>
          <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Link to="/pokemons">
              <Typography variant="h5">Pokemons</Typography>
            </Link>

            <div style={{ display: 'flex' }}>
              {getCurrentRang() && (
                <img
                  style={{ width: 40, marginRight: 12 }}
                  alt={getCurrentRang()?.rang}
                  src={getCurrentRang()?.prize}
                />
              )}

              <div>
                <Typography>
                  You know {count} of {MAX_POKEMON_COUNT} pokemons
                </Typography>

                <Typography>You rang: {getCurrentRang()?.rang}</Typography>
              </div>
            </div>
          </Toolbar>
        </AppBar>
      </Box>

      <Box component="main" sx={{ p: 3, width: '100%' }}>
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
