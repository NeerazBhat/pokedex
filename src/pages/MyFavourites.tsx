import { Container, Heading, SimpleGrid } from '@chakra-ui/react';
import { useQueries, useQuery } from '@tanstack/react-query';
import ErrorMessage from '../components/common/ErrorMessage';
import Loader from '../components/common/Loader';
import { fetchFavPokemons } from '../services/favourites';
import type { IFavPokemonData } from '../types/favourites';
import { fetchPokemonDetail } from '../services/home';
import PokemonCard from '../components/home/pokemonCard/PokemonCard';
import type { IPokemonDetail } from '../types/pokemon';

const MyFavourites = () => {
  const {
    isLoading: isFavPokemonListLoading,
    isError: isFavPokemonListError,
    data: favPokemonList,
  } = useQuery<IFavPokemonData[]>({
    queryKey: ['favPokemon'],
    queryFn: fetchFavPokemons,
  });

  const results = favPokemonList || [];

  const favPokemonListQueries = useQueries({
    queries: results.map((pokemon) => ({
      queryKey: ['pokemon', pokemon.name],
      queryFn: () => fetchPokemonDetail(pokemon.name),
      staleTime: 30000,
    })),
  });

  const isPokemonDetailLoading = favPokemonListQueries.some(
    (data) => data.isLoading
  );

  const isPokemonDetailError = favPokemonListQueries.some(
    (data) => data.isError
  );

  if (isFavPokemonListLoading || isPokemonDetailLoading) {
    return <Loader />;
  }

  if (isFavPokemonListError || isPokemonDetailError) {
    return <ErrorMessage message="Error something went wrong" />;
  }

  const loadedPokemonList = favPokemonListQueries?.map(
    (query) => query.data as IPokemonDetail
  );

  return (
    <Container maxW="7xl">
      <Heading as="h2" my={6}>
        My Favourites
      </Heading>
      <SimpleGrid columns={5} spacing={4}>
        {loadedPokemonList.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemonName={pokemon.name} />
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default MyFavourites;
