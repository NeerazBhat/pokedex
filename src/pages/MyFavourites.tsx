import { Container, Heading, SimpleGrid } from '@chakra-ui/react';
import ErrorMessage from '../components/common/ErrorMessage';
import Loader from '../components/common/Loader';
import PokemonCard from '../components/home/pokemonCard/PokemonCard';
import type { IPokemonDetail } from '../types/pokemon';
import { useFavPokemonList } from '../hooks/useFavPokemonList';
import { usePokemonDetail } from '../hooks/usePokemonDetail';

const MyFavourites = () => {
  const {
    isLoading: isFavPokemonListLoading,
    isError: isFavPokemonListError,
    data: favPokemonList,
  } = useFavPokemonList();

  const results = favPokemonList || [];

  const favPokemonListQueries = usePokemonDetail(results);

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
