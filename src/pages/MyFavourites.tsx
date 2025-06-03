import {
  Button,
  Container,
  Heading,
  SimpleGrid,
  VStack,
} from '@chakra-ui/react';
import ErrorMessage from '../components/common/ErrorMessage';
import Loader from '../components/common/Loader';
import { Link } from 'react-router';
import { PAGE_URLS } from '../lib/routes';
import PokemonCard from '../components/common/PokemonCard';
import { useQuery } from '@tanstack/react-query';
import type { IFavPokemonData } from '../types/favourites';
import { fetchFavPokemons } from '../services/favourites';

const MyFavourites = () => {
  const {
    isLoading: isFavPokemonListLoading,
    isError: isFavPokemonListError,
    data: favPokemonList,
  } = useQuery<IFavPokemonData[]>({
    queryKey: ['favPokemons'],
    queryFn: fetchFavPokemons,
  });

  const results = favPokemonList || [];

  if (isFavPokemonListLoading) {
    return <Loader />;
  }

  if (isFavPokemonListError) {
    return <ErrorMessage message="Error something went wrong" />;
  }

  if (results?.length < 1) {
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
        {results.map((pokemon) => (
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
