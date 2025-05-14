import { Button, Container, HStack, SimpleGrid } from '@chakra-ui/react';
import { useQueries, useQuery } from '@tanstack/react-query';
import { fetchPokemonDetail, fetchPokemons } from '../services/_home';
import Loader from '../components/common/Loader';
import { useState } from 'react';
import ErrorMessage from '../components/common/ErrorMessage';
import PokemonCard from '../components/_home/pokemonCard/PokemonCard';
import type { IPokemonDetail } from '../types/pokemon';

const Home = () => {
  const [offset, setOffset] = useState(0);
  const limit = 20;

  const {
    isLoading: isPokemonsListLoading,
    isError: pokemonsListError,
    data: pokemonsList,
  } = useQuery({
    queryKey: ['pokemons', offset],
    queryFn: () => fetchPokemons(offset, limit),
    staleTime: 30000,
  });

  const results = pokemonsList?.results || [];

  const pokemonListQueries = useQueries({
    queries: results.map((pokemon: { name: string; url: string }) => ({
      queryKey: ['pokemon', pokemon.name],
      queryFn: () => fetchPokemonDetail(pokemon.name),
      staleTime: 30000,
    })),
  });

  const arePokemonDetailsLoading = pokemonListQueries.some(
    (query) => query.isLoading
  );

  const pokemonDetailsError = pokemonListQueries.some((query) => query.isError);

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
      <SimpleGrid columns={5} spacing={4}>
        {pokemonListQueries.map((lists) => {
          const pokemon = lists.data as IPokemonDetail;
          return (
            <PokemonCard
              key={pokemon.name}
              pokemonName={pokemon.name}
              initialData={pokemon}
            />
          );
        })}
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
