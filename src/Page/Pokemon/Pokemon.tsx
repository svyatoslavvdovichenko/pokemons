import {
  Backdrop,
  Button,
  Card,
  CircularProgress,
  Container,
  Input,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { PokeImages } from '../../components/Pokemon/Tabs/PokeImages';
import { PokeMainInfo } from '../../components/Pokemon/Tabs/PokeMainInfo';
import { capitalizeFirstLetter } from '../../helper';
import { useTypedDispatch, useTypedSelector } from '../../hooks';
import { fetchPokemon } from '../../store/pokemons/actionCreators';

interface IImage {
  isGame: boolean;
}

const StyledMainImage = styled.img<IImage>`
  height: 78%;
  width: 95%;

  ${({ isGame }) =>
    isGame &&
    css`
      height: 65%;
      width: 80%;
      filter: brightness(0%);
    `}

  @media (max-width: 900px) {
    height: 45%;
    width: 60%;
  }
`;

const StyledGridMain = styled(Grid)`
  display: flex;
  flex-direction: column;

  align-items: center;
`;

const StyledContainer = styled(Container)`
  && {
    padding-right: 0px;
  }
`;

const a11yProps = (index: number) => ({
  id: `full-width-tab-${index}`,
  'aria-controls': `full-width-tabpanel-${index}`,
});

const Pokemon: FC = () => {
  const { id } = useParams();
  const dispatch = useTypedDispatch();
  const { pokemon, isLoading } = useTypedSelector(
    state => state.pokemons.currentPokemon,
  );
  const [namePokemon, setNamePokemon] = useState('');
  const [currentTab, setCurrentTab] = useState(0);
  const [isOpenGame, setIsOpenGame] = useState(true);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setCurrentTab(newValue);
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchPokemon(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (pokemon.name) {
      console.log(`Just don't tell anyone his name: ${pokemon.name}`);
    }
  }, [pokemon]);

  const pokemonTabs = [
    { title: 'Main', component: <PokeMainInfo />, key: 0 },
    { title: 'Images', component: <PokeImages />, key: 1 },
    { title: 'Ability', component: <>ffff</>, key: 2 },
    { title: 'Evolutions', component: <>ffff</>, key: 3 },
  ];

  const handleCheckPokemon = () => {
    if (
      namePokemon.length > 3 &&
      pokemon.name.toLowerCase().includes(namePokemon.toLowerCase().trim())
    ) {
      setIsOpenGame(false);
      return;
    }
    if (namePokemon.toLowerCase().trim() === pokemon.name.toLowerCase()) {
      setIsOpenGame(false);
      return;
    }
    // dispatch(openError)

    setNamePokemon('');
  };

  return (
    <Card sx={{ mt: 8, p: 2 }}>
      {Object.values(pokemon).length > 0 ? (
        <Grid container spacing={2}>
          <StyledGridMain xs={12} md={isOpenGame ? 12 : 6}>
            <Typography variant='h2'>
              {isOpenGame
                ? " Who's That Pokémon?"
                : capitalizeFirstLetter(pokemon.name)}
            </Typography>

            <StyledMainImage
              isGame={isOpenGame}
              src={pokemon.sprites.other.dream_world.front_default}
              alt={pokemon.name}
            />

            {isOpenGame && (
              <>
                <Input
                  sx={{ mt: 1 }}
                  placeholder='Poke name'
                  value={namePokemon}
                  autoFocus
                  onKeyPress={ev => {
                    if (ev.key === 'Enter') {
                      handleCheckPokemon();
                      ev.preventDefault();
                    }
                  }}
                  onChange={event => setNamePokemon(event.target.value)}
                />
                <Button onClick={handleCheckPokemon}>Check me</Button>
              </>
            )}
          </StyledGridMain>
          {!isOpenGame && (
            <Grid xs={12} md={6}>
              <Tabs
                value={currentTab}
                onChange={handleChange}
                indicatorColor='secondary'
                textColor='inherit'
                variant='fullWidth'
                aria-label='full width tabs example'
              >
                {pokemonTabs.map(tab => (
                  <Tab
                    label={tab.title}
                    key={tab.key}
                    {...a11yProps(tab.key)}
                  />
                ))}
              </Tabs>
              {pokemonTabs.map(content => (
                <StyledContainer key={content.key}>
                  {currentTab === content.key && content.component}
                </StyledContainer>
              ))}
            </Grid>
          )}
        </Grid>
      ) : (
        <Backdrop
          sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
          open={isLoading}
        >
          <CircularProgress color='inherit' />
        </Backdrop>
      )}
    </Card>
  );
};

export default Pokemon;
