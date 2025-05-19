import { useQuery } from '@tanstack/react-query';
import type { ISpeciesDetail } from '../types/species';
import { fetchPokemonSpecies } from '../services/viewDetails';

export const usePokemonSpecies = (pokemonName: string) => {
  return useQuery<ISpeciesDetail>({
    queryKey: ['species', pokemonName],
    queryFn: () => fetchPokemonSpecies(pokemonName),
    staleTime: 30000,
    enabled: !!pokemonName,
  });
};
