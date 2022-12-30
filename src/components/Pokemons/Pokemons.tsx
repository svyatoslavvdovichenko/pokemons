import { FC, useEffect, useLayoutEffect, useMemo, useState } from "react";
import Alert from "../Alert/Alert";
import { useTypedDispatch, useTypedSelector } from "../../hooks";
import { fetchPokemons } from "../../store/pokemons/actionCreators";
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
} from "@mui/material";
import { findColor, findVariant } from "../../helper";
import { Link, useNavigate } from "react-router-dom";
import MultipleSelectChip from "../SelectType";
import TablePaginationActions from "../Pagination/Pagination";
import qs from "qs";

interface IQuery {
  rowsPerPage: string;
  currentPage: string;
  typePokemon: string[];
}

interface ISearchOption {
  page: number;
  rowsPerPage: number;
}

const Pokemons: FC = () => {
  const dispatch = useTypedDispatch();
  const navigate = useNavigate();
  const { count, pokemons, loading } = useTypedSelector(
    (state) => state.pokemons.pokemons
  );
  const [searchOption, setSearchOption] = useState<ISearchOption>({
    page: 0,
    rowsPerPage: 10,
  });
  const [personName, setPersonName] = useState<string[]>([]);

  useEffect(() => {
    if (searchOption) {
      dispatch(fetchPokemons({ ...searchOption }));
    }
  }, [searchOption, dispatch]);

  useLayoutEffect(() => {
    const queryString = qs.stringify({
      currentPage: searchOption.page,
      rowsPerPage: searchOption.rowsPerPage,
      typePokemon: personName,
    });

    navigate(`?${queryString}`);
  }, [searchOption, navigate, personName]);

  useLayoutEffect(() => {
    if (window.location.search) {
      const params = qs.parse(
        window.location.search.substring(1)
      ) as unknown as IQuery;

      if (params.rowsPerPage) {
        setSearchOption({
          ...searchOption,
          rowsPerPage: Number(params.rowsPerPage),
        });
      }

      if (params.currentPage) {
        setSearchOption({
          ...searchOption,
          page: Number(params.currentPage),
        });
      }

      if (params.typePokemon) {
        setPersonName(params.typePokemon);
      }
    }
  }, []);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    newPage: number
  ) => {
    setSearchOption({ ...searchOption, page: newPage });
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchOption({
      ...searchOption,
      page: 0,
      rowsPerPage: Number(event.target.value),
    });
  };

  const filterByTag = useMemo(() => {
    if (personName.length === 0) {
      return pokemons;
    }

    if (pokemons) {
      return pokemons!.filter((pokemon) => {
        return pokemon.types
          .map((type) => personName.includes(type.type.name))
          .some((type) => Boolean(type));
      });
    }

    return [];
  }, [personName, pokemons]);

  return (
    <>
      <TableContainer sx={{ mt: 10 }} component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <MultipleSelectChip
              setPersonName={setPersonName}
              personName={personName}
            />

            <TableRow>
              <TableCell>Name</TableCell>

              <TableCell align="center">Image</TableCell>

              <TableCell align="center">Types</TableCell>

              <TableCell align="center">Height</TableCell>

              <TableCell align="center">Width</TableCell>
            </TableRow>
          </TableHead>
          {!loading && filterByTag && filterByTag.length > 0 ? (
            <TableBody>
              {filterByTag!.map((pokemon) => (
                <TableRow
                  key={pokemon.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    <Link to={`/pokemons/${pokemon.id}`}>
                      {pokemon.name.charAt(0).toUpperCase() +
                        pokemon.name.slice(1)}
                    </Link>
                  </TableCell>

                  <TableCell component="th" scope="row">
                    <Link to={`/pokemons/${pokemon.id}`}>
                      <img
                        src={pokemon.sprites.front_default}
                        alt={pokemon.name}
                      />
                    </Link>
                  </TableCell>

                  <TableCell component="th" scope="row">
                    {pokemon.types.map((typesPokemon, index) => (
                      <Container key={index}>
                        <Chip
                          sx={{ mt: 1 }}
                          label={typesPokemon.type.name}
                          color={findColor(typesPokemon.type.name)}
                          variant={findVariant(typesPokemon.type.name)}
                        />
                      </Container>
                    ))}
                  </TableCell>

                  <TableCell component="th" scope="row">
                    {`${pokemon.height * 10} sm`}
                  </TableCell>

                  <TableCell component="th" scope="row">
                    {`${pokemon.weight} kg`}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          ) : (
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
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
                page={searchOption.page}
                rowsPerPage={searchOption.rowsPerPage}
                color="secondary"
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </TableContainer>
      <Alert message="error" />
    </>
  );
};

export default Pokemons;
