import {
  Button,
  Container,
  Grid,
  GridItem,
  HStack,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import Loader from '../components/common/Loader';
import { useEffect, useMemo, useReducer, useState } from 'react';
import ErrorMessage from '../components/common/ErrorMessage';
import SortDropdown, { SortOptions } from '../components/home/SortDropdown';
import AdvancedSearch from '../components/home/AdvancedSearch';
import { useMutation, useQuery } from '@tanstack/react-query';
import type { IFilterList, IFilterResults } from '../types/filterResults';
import { fetchPokemonList, postFilterOptions } from '../services/home';
import {
  advancedFilterReducer,
  INITIAL_STATE,
  type IFilterState,
} from '../global-state/reducers/advancedFilterReducer';
import PokemonCard from '../components/common/PokemonCard';
import type { IPokemonList } from '../types/pokemon';

const Home = () => {
  const [offset, setOffset] = useState(0);
  const [sortOrder, setSortOrder] = useState<SortOptions | null>(null);
  const limit = 20;

  const [filterState, dispatch] = useReducer(
    advancedFilterReducer,
    INITIAL_STATE
  );

  const {
    isLoading: isPokemonsListLoading,
    isError: pokemonsListError,
    data: pokemonsList,
  } = useQuery<IPokemonList>({
    queryKey: ['pokemons', offset],
    queryFn: () => fetchPokemonList(offset, limit),
    staleTime: 30000,
  });

  const count = pokemonsList?.count || 0;

  const {
    mutate: addFilter,
    data: typesFilteredList,
    isPending: filterListPending,
    isError: filterListError,
  } = useMutation<IFilterResults, Error, IFilterState>({
    mutationFn: (filterOptions) => postFilterOptions(filterOptions),
  });

  const isFilterEnabled =
    filterState.types?.length ||
    filterState.habitats ||
    filterState.classification;

  useEffect(() => {
    if (isFilterEnabled) {
      addFilter(filterState);
    }
  }, [filterState, addFilter, isFilterEnabled]);

  const hasNext = offset + limit < count;
  const hasPrev = offset > 0;

  const showList: IFilterList[] = isFilterEnabled
    ? typesFilteredList?.results
    : (pokemonsList?.results as Array<{ name: string; url: string }>);

  const sortedPokemons = useMemo(() => {
    if (sortOrder === SortOptions.ASC) {
      return [...(showList ?? [])].sort((a, b) => a.name.localeCompare(b.name));
    }
    if (sortOrder === SortOptions.DSC) {
      return [...(showList ?? [])].sort((a, b) => b.name.localeCompare(a.name));
    }
    return showList;
  }, [sortOrder, showList]);

  return (
    <Container maxW="8xl" mt={6}>
      <Grid templateColumns="repeat(5, 1fr)" gap={6}>
        <GridItem colSpan={1} mt={14}>
          <AdvancedSearch dispatch={dispatch} />
        </GridItem>
        <GridItem colSpan={4}>
          <HStack justifyContent="end" mb={6}>
            <SortDropdown setSortOrder={setSortOrder} />
          </HStack>

          {isFilterEnabled && showList?.length > 1 && (
            <Text my={6} textAlign="center">
              {showList.length} results found
            </Text>
          )}
          {showList?.length < 1 ? (
            <HStack height="80dvh" width="100%" justifyContent="center">
              <Text color="red.500">
                Couldn't found any result, Please try different
              </Text>
            </HStack>
          ) : (
            <>
              {(isPokemonsListLoading || filterListPending) && <Loader />}
              {(pokemonsListError || filterListError) && (
                <ErrorMessage message="Error something went wrong" />
              )}
              <SimpleGrid columns={5} spacing={5} pb={8}>
                {sortedPokemons?.map((pokemon) => {
                  const pokemonID = pokemon?.id
                    ? pokemon.id
                    : Number(pokemon.url.split('/').at(-2));
                  return (
                    <PokemonCard
                      key={pokemon.name}
                      pokemonName={pokemon.name}
                      pokemonID={pokemonID}
                    />
                  );
                })}
              </SimpleGrid>
              {!isFilterEnabled && (
                <HStack justifyContent="center" mt={3} mb={12}>
                  <Button
                    onClick={() => setOffset(offset - limit)}
                    colorScheme="purple"
                    bg="purple.700"
                    color="yellow"
                    disabled={!hasPrev}
                  >
                    Prev
                  </Button>
                  <Button
                    onClick={() => setOffset(offset + limit)}
                    colorScheme="purple"
                    bg="purple.700"
                    color="yellow"
                    disabled={!hasNext}
                  >
                    Next
                  </Button>
                </HStack>
              )}
            </>
          )}
        </GridItem>
      </Grid>
    </Container>
  );
};

export default Home;
