import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { fetchPokemonDetail, fetchPokemonSpecies } from '../services/_home';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';
import HeroSection from '../components/viewDetail/HeroSection';
import { Box, Container } from '@chakra-ui/react';
import MovesSection from '../components/viewDetail/MovesSection';
import EvolutionSection from '../components/viewDetail/EvolutionSection';
import type { ISpeciesDetail } from '../types/species';

const ViewDetail = () => {
  const { name } = useParams();

  const pokemonName = name ?? '';

  const {
    isLoading: pokemonDetailLoading,
    isError: pokemonDetailError,
    data: pokemonDetails,
  } = useQuery({
    queryKey: ['pokemon', pokemonName],
    queryFn: () => fetchPokemonDetail(pokemonName),
    staleTime: 20000,
    enabled: !!pokemonName,
  });

  const {
    isLoading: pokemonSpeciesLoading,
    isError: pokemonSpeciesError,
    data: pokemonSpecies,
  } = useQuery<ISpeciesDetail>({
    queryKey: ['species', pokemonName],
    queryFn: () => fetchPokemonSpecies(pokemonName),
    staleTime: 30000,
  });

  if (pokemonDetailLoading || pokemonSpeciesLoading || !pokemonSpecies) {
    return <Loader />;
  }

  if (pokemonDetailError || pokemonSpeciesError) {
    return <ErrorMessage message="Error something went wrong" />;
  }

  return (
    <Box as="main" pb={10}>
      <HeroSection pokemon={pokemonDetails} species={pokemonSpecies} />
      <Container maxW="8xl">
        <MovesSection moves={pokemonDetails.moves} />
        <EvolutionSection evolutionUrl={pokemonSpecies?.evolution_chain.url} />
      </Container>
    </Box>
  );
};

export default ViewDetail;
