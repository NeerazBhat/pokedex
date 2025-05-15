import { AbsoluteCenter, Box, Divider, HStack } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import { fetchPokemonEvolution } from '../../services/_home';
import SimpleSpinner from '../common/SimpleSpinner';
import ErrorMessage from '../common/ErrorMessage';
import type { IEvolutionDetail } from '../../types/evolution';
import PokemonCard from '../_home/pokemonCard/PokemonCard';
import { ArrowForwardIcon } from '@chakra-ui/icons';

interface IEvolutionProps {
  evolutionUrl: string;
}

const EvolutionSection = ({ evolutionUrl }: IEvolutionProps) => {
  // const evolutionUrl = pokemonSpecies?.evolution_chain.url ?? ''; //fallback for null or undefined
  const evolutionID = evolutionUrl?.split('/').at(-2);

  const {
    isLoading: pokemonEvolutionLoading,
    isError: pokemonEvolutionError,
    data: pokemonEvolution,
  } = useQuery<IEvolutionDetail>({
    queryKey: ['evolution', evolutionID],
    queryFn: () => fetchPokemonEvolution(evolutionUrl),
    enabled: !!evolutionUrl,
    staleTime: 30000,
  });

  if (pokemonEvolutionLoading) {
    return (
      <HStack minH="200px" justifyContent="center">
        <SimpleSpinner />
      </HStack>
    );
  }

  if (pokemonEvolutionError) {
    return <ErrorMessage message="Error something went wrong" />;
  }

  return (
    <>
      <Box position="relative" mt={8} mb={16}>
        <Divider borderColor="gray.600" />
        <AbsoluteCenter bg="white" px="4" fontSize={40} fontWeight={900}>
          Evolution
        </AbsoluteCenter>
      </Box>
      <HStack justifyContent="center" gap={6}>
        {pokemonEvolution?.chain?.species?.name && (
          <PokemonCard
            pokemonName={pokemonEvolution.chain.species.name}
            maxW="250px"
          />
        )}
        {pokemonEvolution?.chain?.evolves_to[0].species.name && (
          <>
            <ArrowForwardIcon />
            <PokemonCard
              pokemonName={pokemonEvolution?.chain?.evolves_to[0].species.name}
              maxW="250px"
            />
          </>
        )}
        {pokemonEvolution?.chain.evolves_to?.[0]?.evolves_to[0]?.species
          ?.name && (
          <>
            <ArrowForwardIcon />
            <PokemonCard
              pokemonName={
                pokemonEvolution?.chain.evolves_to?.[0]?.evolves_to[0]?.species
                  ?.name
              }
              maxW="250px"
            />
          </>
        )}
      </HStack>
    </>
  );
};

export default EvolutionSection;
