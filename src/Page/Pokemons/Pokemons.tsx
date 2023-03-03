import { FC, useEffect, useMemo } from 'react';
import { useTypedDispatch, useTypedSelector } from '../../hooks';
import { fetchPokemons } from '../../store/pokemons/actionCreators';
import {
  Chip,
  Container,
  TableFooter,
  TablePagination,
  TableBody,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Backdrop,
} from '@mui/material';
import { findColor, findVariant } from '../../helper';
import { Link, useSearchParams } from 'react-router-dom';
import MultipleSelectChip from '../../components/SelectType';
import TablePaginationActions from '../../components/Pagination/Pagination';
import qs from 'qs';

const tableCells = [
  { title: 'Name', key: 1 },
  { title: 'Image', key: 2 },
  { title: 'Types', key: 3 },
  { title: 'Height', key: 4 },
  { title: 'Weight', key: 5 },
];

const Pokemons: FC = () => {
  const dispatch = useTypedDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const { count, pokemons, loading } = useTypedSelector(
    state => state.pokemons.pokemons,
  );

  useEffect(() => {
    if (searchParams) {
      dispatch(
        fetchPokemons({
          rowsPerPage: Number(searchParams.get('rowsPerPage') ?? 10),
          page: Number(searchParams.get('page') ?? 0),
        }),
      );
    }
  }, [searchParams, dispatch]);

  useEffect(() => {
    if (!searchParams) {
      setSearchParams(
        qs.stringify({
          page: 0,
          rowsPerPage: 10,
        }),
      );
    }
  }, []);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number,
  ) => {
    setSearchParams(prev => ({
      ...prev,
      rowsPerPage: searchParams.get('rowsPerPage') ?? 10,
      page: newPage,
      types: searchParams.get('types') ?? '',
    }));
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) =>
    setSearchParams(prev => ({
      ...prev,
      types: searchParams.get('types') ?? '',
      page: 0,
      rowsPerPage: Number(event.target.value),
    }));

  const filterByTag = useMemo(() => {
    if (
      Object.values(qs.parse(searchParams.get('types') ?? ''))?.length === 0
    ) {
      return pokemons;
    }

    if (pokemons) {
      return pokemons!.filter(pokemon =>
        pokemon.types
          .map(type => searchParams.get('types')?.includes(type.type.name))
          .some(type => Boolean(type)),
      );
    }

    return [];
  }, [searchParams, pokemons]);

  return (
    <>
      <TableContainer sx={{ mt: 8 }} component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <MultipleSelectChip
              setPersonName={types => {
                setSearchParams(prev => ({
                  ...prev,
                  rowsPerPage: Number(searchParams.get('rowsPerPage') ?? 10),
                  page: 0,
                  types: qs.stringify(types),
                }));
              }}
              personName={
                Object.values(
                  qs.parse(searchParams.get('types') ?? ''),
                ) as string[]
              }
            />

            <TableRow>
              {tableCells.map((cell, index) => (
                <TableCell
                  align={index > 0 ? 'center' : undefined}
                  key={cell.key}
                >
                  {cell.title}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          {!loading && filterByTag && filterByTag.length > 0 ? (
            <TableBody>
              {filterByTag!.map(pokemon => (
                <TableRow
                  key={pokemon.id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="col">
                    <Link to={`/pokemons/${pokemon.id}`}>
                      {pokemon.name.charAt(0).toUpperCase() +
                        pokemon.name.slice(1)}
                    </Link>
                  </TableCell>

                  <TableCell component="th" scope="col">
                    <Link to={`/pokemons/${pokemon.id}`}>
                      <img
                        src={pokemon.sprites.front_default}
                        alt={pokemon.name}
                      />
                    </Link>
                  </TableCell>

                  <TableCell component="th" scope="col">
                    {pokemon.types.map((typesPokemon, index) => (
                      <Container
                        sx={{
                          padding: 0,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                        key={index}
                      >
                        <Chip
                          sx={{ mt: 1 }}
                          label={typesPokemon.type.name}
                          color={findColor(typesPokemon.type.name)}
                          variant={findVariant(typesPokemon.type.name)}
                        />
                      </Container>
                    ))}
                  </TableCell>

                  <TableCell component="th" scope="col">
                    <Container
                      sx={{
                        display: 'flex',
                        height: '100%',
                        justifyContent: 'center',
                      }}
                    >
                      {`${pokemon.height * 10} sm`}
                    </Container>
                  </TableCell>

                  <TableCell component="th" scope="col">
                    <Container
                      sx={{
                        display: 'flex',
                        height: '100%',
                        justifyContent: 'center',
                      }}
                    >
                      {`${pokemon.weight} kg`}
                    </Container>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <Backdrop
              sx={{ color: '#fff', zIndex: theme => theme.zIndex.drawer + 1 }}
              open={loading}
            >
              <CircularProgress color="inherit" />
            </Backdrop>
          )}

          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 20]}
                count={count!}
                ActionsComponent={TablePaginationActions}
                page={Number(searchParams.get('page') ?? 0)}
                rowsPerPage={Number(searchParams.get('rowsPerPage') ?? 10)}
                color="secondary"
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
    </>
  );
};

export default Pokemons;
