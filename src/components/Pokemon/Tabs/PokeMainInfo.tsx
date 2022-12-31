import { Container, Rating, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { Box } from '@mui/system';
import { FC } from 'react';
import { capitalizeFirstLetter } from '../../../helper';
import { useTypedSelector } from '../../../hooks';

const labels: { [index: string]: string } = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+',
  5.5: 'Insane',
};

const getMark = (stat: number) => {
  let statCount = 0;
  let statMaxCount = 100;
  let maxMark = 5;

  if (stat > 100) {
    return 5.5;
  }

  for (let index = 0; index <= 5; index += 0.5) {
    if (stat <= statCount) {
      return index;
    }

    if (stat <= statMaxCount && stat > statMaxCount - 10) {
      return maxMark;
    }

    maxMark -= 0.5;
    statCount += 10;
    statMaxCount -= 10;
  }

  return 0;
};

export const PokeMainInfo: FC = () => {
  const { pokemon, isLoading } = useTypedSelector(
    state => state.pokemons.currentPokemon,
  );

  return (
    <Grid container spacing={2}>
      {pokemon.stats.map(pokestat => (
        <>
          <Grid xs={4}>
            <Typography component='span'>
              {capitalizeFirstLetter(pokestat.stat.name)}
            </Typography>
          </Grid>

          <Grid sx={{ display: 'flex' }} xs={8}>
            <Grid xs={4}>
              <Typography component='span'>{pokestat.base_stat}</Typography>
            </Grid>

            <Grid xs={5}>
              <Rating
                name='text-feedback'
                value={getMark(pokestat.base_stat)}
                readOnly
                precision={0.5}
              />
            </Grid>

            <Grid xs={1}>
              <Typography>{labels[getMark(pokestat.base_stat)]}</Typography>
            </Grid>
          </Grid>
        </>
      ))}
    </Grid>
  );
};
