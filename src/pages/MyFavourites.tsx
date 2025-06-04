import { Button, Container, SimpleGrid, Text, VStack } from '@chakra-ui/react';
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
        <Text fontSize={28} fontWeight={700} mb={4}>
          Your Favourites list is empty right now
        </Text>
        <Link to={PAGE_URLS.HOME}>
          <Button colorScheme="green">Add Pokemons</Button>
        </Link>
      </VStack>
    );
  }

  return (
    <Container maxW="7xl">
      <Text fontSize={36} fontWeight={700} my={6}>
        My Favourites
      </Text>
      <SimpleGrid columns={5} spacing={5}>
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
