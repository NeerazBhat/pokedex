import { Button, Container, HStack, SimpleGrid } from '@chakra-ui/react';
import Loader from '../components/common/Loader';
import { useMemo, useState } from 'react';
import ErrorMessage from '../components/common/ErrorMessage';
import PokemonCard from '../components/home/pokemonCard/PokemonCard';
import type { IPokemonDetail } from '../types/pokemon';
import SortDropdown, { SortOptions } from '../components/home/SortDropdown';
import { usePokemonList } from '../hooks/usePokemonList';
import { usePokemonDetail } from '../hooks/usePokemonDetail';
import AdvancedSearch from '../components/home/AdvancedSearch';

const Home = () => {
  const [offset, setOffset] = useState(0);
  const [sortOrder, setSortOrder] = useState<SortOptions | null>(null);
  const limit = 20;

  const {
    isLoading: isPokemonsListLoading,
    isError: pokemonsListError,
    data: pokemonsList,
  } = usePokemonList(offset, limit);

  const results = pokemonsList?.results || [];

  const pokemonListQueries = usePokemonDetail(results);

  const arePokemonDetailsLoading = pokemonListQueries.some(
    (query) => query.isLoading
  );

  const pokemonDetailsError = pokemonListQueries.some((query) => query.isError);

  const loadedPokemonList = pokemonListQueries.map(
    (query) => query.data as IPokemonDetail
  );

  const sortedPokemons = useMemo(() => {
    if (sortOrder === SortOptions.ASC) {
      return [...loadedPokemonList].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
    }
    if (sortOrder === SortOptions.DSC) {
      return [...loadedPokemonList].sort((a, b) =>
        b.name.localeCompare(a.name)
      );
    }
    return loadedPokemonList;
  }, [sortOrder, loadedPokemonList]);

  if (isPokemonsListLoading || arePokemonDetailsLoading) {
    return <Loader />;
  }

  if (pokemonsListError || pokemonDetailsError) {
    return <ErrorMessage message="Error something went wrong" />;
  }

  const hasNext = offset + limit < pokemonsList.count;
  const hasPrev = offset > 0;

  return (
    <Container maxW="7xl">
      <HStack justifyContent="space-between" mb={6}>
        <AdvancedSearch />
        <SortDropdown setSortOrder={setSortOrder} />
      </HStack>
      <SimpleGrid columns={5} spacing={4}>
        {sortedPokemons?.map((pokemon) => (
          <PokemonCard
            key={pokemon.name}
            pokemonName={pokemon.name}
            pokemonID={pokemon.id}
            initialData={pokemon}
          />
        ))}
      </SimpleGrid>
      <HStack justifyContent="center" my={8}>
        <Button
          onClick={() => setOffset(offset - limit)}
          colorScheme="orange"
          disabled={!hasPrev}
        >
          Prev
        </Button>
        <Button
          onClick={() => setOffset(offset + limit)}
          colorScheme="orange"
          disabled={!hasNext}
        >
          Next
        </Button>
      </HStack>
    </Container>
  );
};

export default Home;
