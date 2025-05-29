import {
  Button,
  Container,
  Heading,
  SimpleGrid,
  VStack,
} from '@chakra-ui/react';
import ErrorMessage from '../components/common/ErrorMessage';
import Loader from '../components/common/Loader';
import type { IPokemonDetail } from '../types/pokemon';
import { useFavPokemonList } from '../hooks/useFavPokemonList';
import { usePokemonDetail } from '../hooks/usePokemonDetail';
import { Link } from 'react-router';
import { PAGE_URLS } from '../lib/routes';
import PokemonCard from '../components/common/PokemonCard';

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

  if (results.length < 1) {
    return (
      <VStack minH="90dvh" justifyContent="center">
        <Heading mb={4}>Your Favourites list is empty right now</Heading>
        <Link to={PAGE_URLS.HOME}>
          <Button colorScheme="green">Add Pokemons</Button>
        </Link>
      </VStack>
    );
  }

  return (
    <Container maxW="7xl">
      <Heading as="h2" my={6}>
        My Favourites
      </Heading>
      <SimpleGrid columns={5} spacing={4}>
        {loadedPokemonList.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            pokemonName={pokemon.name}
            pokemonID={pokemon.id}
          />
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default MyFavourites;
