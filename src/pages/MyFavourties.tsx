import { Container } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import ErrorMessage from '../components/common/ErrorMessage';
import Loader from '../components/common/Loader';
import { fetchFavPokemons } from '../services/_home';

const MyFavourties = () => {
  const {
    isLoading,
    isError,
    data: favPokemonList,
  } = useQuery({
    queryKey: ['favPokemon'],
    queryFn: fetchFavPokemons,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorMessage message="Error something went wrong" />;
  }

  console.log(favPokemonList);

  return <Container maxW="7xl">MyFavourtites</Container>;
};

export default MyFavourties;
