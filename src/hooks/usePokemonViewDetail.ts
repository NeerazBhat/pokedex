import { useQuery } from '@tanstack/react-query';
import type { IPokemonDetail } from '../types/pokemon';
import { fetchPokemonDetail } from '../services/home';

export const usePokemonViewDetail = (pokemonName: string) => {
  return useQuery<IPokemonDetail>({
    queryKey: ['pokemon', pokemonName],
    queryFn: () => fetchPokemonDetail(pokemonName),
    staleTime: 30000,
    enabled: !!pokemonName,
  });
};
