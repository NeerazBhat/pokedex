import { AbsoluteCenter, Box, Divider, HStack } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import {
  fetchPokemonEvolution,
  fetchPokemonSpecies,
} from '../../services/_home';
import SimpleSpinner from '../common/SimpleSpinner';
import ErrorMessage from '../common/ErrorMessage';
import type { IEvolutionDetail } from '../../types/evolution';
import type { ISpeciesDetail } from '../../types/species';
import PokemonCard from '../_home/pokemonCard/PokemonCard';

interface IEvolutionProps {
  name: string;
}

const EvolutionSection = ({ name }: IEvolutionProps) => {
  const {
    isLoading: pokemonSpeciesLoading,
    isError: pokemonSpeciesError,
    data: pokemonSpecies,
  } = useQuery<ISpeciesDetail>({
    queryKey: ['species', name],
    queryFn: () => fetchPokemonSpecies(name),
  });

  const evolutionUrl = pokemonSpecies?.evolution_chain.url ?? ''; //fallback for null or undefined

  const {
    isLoading: pokemonEvolutionLoading,
    isError: pokemonEvolutionError,
    data: pokemonEvolution,
  } = useQuery<IEvolutionDetail>({
    queryKey: ['evolution', name],
    queryFn: () => fetchPokemonEvolution(evolutionUrl),
    enabled: !!evolutionUrl,
  });

  if (pokemonSpeciesLoading || pokemonEvolutionLoading) {
    return (
      <HStack minH="200px" justifyContent="center">
        <SimpleSpinner />
      </HStack>
    );
  }

  if (pokemonSpeciesError || pokemonEvolutionError) {
    return <ErrorMessage message="Error something went wrong" />;
  }

  return (
    <>
      <Box position="relative" my={8}>
        <Divider borderColor="gray.600" />
        <AbsoluteCenter bg="white" px="4" fontSize={40} fontWeight={900}>
          Evolution
        </AbsoluteCenter>
      </Box>
      <HStack>
        {pokemonEvolution?.chain?.species?.name && (
          <PokemonCard pokemonName={pokemonEvolution.chain.species.name} />
        )}
        {pokemonEvolution?.chain?.evolves_to[0].species.name && (
          <PokemonCard
            pokemonName={pokemonEvolution?.chain?.evolves_to[0].species.name}
          />
        )}
        {pokemonEvolution?.chain.evolves_to?.[0]?.evolves_to[0]?.species
          ?.name && (
          <PokemonCard
            pokemonName={
              pokemonEvolution?.chain.evolves_to?.[0]?.evolves_to[0]?.species
                ?.name
            }
          />
        )}
      </HStack>
    </>
  );
};

export default EvolutionSection;
