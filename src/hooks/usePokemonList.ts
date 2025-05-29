import { useQuery } from '@tanstack/react-query';
import { fetchPokemonList } from '../services/home';
import type { IPokemonList } from '../types/pokemon';

export const usePokemonList = (offset: number, limit: number) => {
  return useQuery<IPokemonList>({
    queryKey: ['pokemons', offset],
    queryFn: () => fetchPokemonList(offset, limit),
    staleTime: 30000,
  });
};
