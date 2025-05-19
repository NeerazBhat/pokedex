import { useParams } from 'react-router';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';
import HeroSection from '../components/viewDetail/HeroSection';
import { Box, Container } from '@chakra-ui/react';
import MovesSection from '../components/viewDetail/MovesSection';
import EvolutionSection from '../components/viewDetail/EvolutionSection';
import TypeDetailSection from '../components/viewDetail/TypeDetailSection';
import { usePokemonViewDetail } from '../hooks/usePokemonViewDetail';
import { usePokemonSpecies } from '../hooks/usePokemonSpecies';

const ViewDetail = () => {
  const { name } = useParams();

  const pokemonName = name ?? '';

  const {
    isLoading: pokemonDetailLoading,
    isError: pokemonDetailError,
    data: pokemonDetails,
  } = usePokemonViewDetail(pokemonName);

  const {
    isLoading: pokemonSpeciesLoading,
    isError: pokemonSpeciesError,
    data: pokemonSpecies,
  } = usePokemonSpecies(pokemonName);

  if (
    pokemonDetailLoading ||
    pokemonSpeciesLoading ||
    !pokemonSpecies ||
    !pokemonDetails
  ) {
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
        <TypeDetailSection pokemonTypes={pokemonDetails.types} />
      </Container>
    </Box>
  );
};

export default ViewDetail;
