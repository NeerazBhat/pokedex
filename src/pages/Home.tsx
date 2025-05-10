import { Container, SimpleGrid } from '@chakra-ui/react';
import { useQueries, useQuery } from '@tanstack/react-query';
import { fetchPokemonDetail, fetchPokemons } from '../services/_home';
import Loader from '../components/common/Loader';
import { useState } from 'react';
import ErrorMessage from '../components/common/ErrorMessage';
import PokemonCard from '../components/_home/pokemonCard/PokemonCard';

export interface IPokemonDetail {
  abilities: [];
  id: number;
  height: number;
  weight: number;
  name: string;
  sprites: {
    other: {
      home: {
        front_default: string;
      };
      'official-artwork': {
        front_default: string;
      };
    };
  };
  types: [{ type: { name: string } }];
}

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
    staleTime: 20000,
  });

  const results = pokemonsList?.results || [];

  const pokemonListQueries = useQueries({
    queries: results.map((pokemon: { name: string; url: string }) => ({
      queryKey: ['pokemon', pokemon.name],
      queryFn: () => fetchPokemonDetail(pokemon.name),
      staleTime: 20000,
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

  return (
    <Container maxW="7xl">
      <SimpleGrid columns={5} spacing={4}>
        {pokemonListQueries.map((lists) => {
          const pokemon = lists.data as IPokemonDetail;
          return <PokemonCard key={pokemon.name} pokemon={pokemon} />;
        })}
      </SimpleGrid>
    </Container>
  );
};

export default Home;
