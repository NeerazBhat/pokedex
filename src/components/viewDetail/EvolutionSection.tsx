import { AbsoluteCenter, Box, Divider, HStack, Text } from '@chakra-ui/react';
import SimpleSpinner from '../common/SimpleSpinner';
import PokemonCard from '../home/pokemonCard/PokemonCard';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { useQuery } from '@tanstack/react-query';
import type { IEvolutionDetail } from '../../types/evolution';
import { fetchPokemonEvolution } from '../../services/viewDetails';

interface IEvolutionProps {
  evolutionUrl: string;
}

const EvolutionSection = ({ evolutionUrl }: IEvolutionProps) => {
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
    return (
      <HStack minH="200px" justifyContent="center">
        <Text textAlign="center" color="red">
          Error something went wrong
        </Text>
      </HStack>
    );
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
            pokemonID={Number(
              pokemonEvolution.chain.species.url.split('/').at(-2)
            )}
            maxW="250px"
          />
        )}
        {pokemonEvolution?.chain?.evolves_to[0].species.name && (
          <>
            <ArrowForwardIcon />
            <PokemonCard
              pokemonName={pokemonEvolution?.chain?.evolves_to[0].species.name}
              pokemonID={Number(
                pokemonEvolution?.chain?.evolves_to[0].species.url
                  .split('/')
                  .at(-2)
              )}
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
              pokemonID={Number(
                pokemonEvolution?.chain.evolves_to?.[0]?.evolves_to[0]?.species?.url
                  .split('/')
                  .at(-2)
              )}
              maxW="250px"
            />
          </>
        )}
      </HStack>
    </>
  );
};

export default EvolutionSection;
