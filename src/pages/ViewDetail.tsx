import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { fetchPokemonDetail } from '../services/_home';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';
import HeroSection from '../components/viewDetail/HeroSection';
import { Container } from '@chakra-ui/react';

const ViewDetail = () => {
  const { name } = useParams();

  const {
    isLoading,
    isError,
    data: pokemon,
  } = useQuery({
    queryKey: ['pokemon', name],
    queryFn: () => {
      if (name) {
        return fetchPokemonDetail(name);
      }
    },
    staleTime: 20000,
    enabled: !!name,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <ErrorMessage message="Error something went wrong" />;
  }

  return (
    <>
      <HeroSection pokemon={pokemon} />
      <Container maxW="8xl">
        {/* <AbilitiesSection abilities={pokemon.abilities} /> */}
      </Container>
    </>
  );
};

export default ViewDetail;
