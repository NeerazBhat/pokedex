import { useQuery } from '@tanstack/react-query';
import { fetchPokemonList } from '../services/home';

export const usePokemonList = (offset: number, limit: number) => {
  return useQuery({
    queryKey: ['pokemons', offset],
    queryFn: () => fetchPokemonList(offset, limit),
    staleTime: 30000,
  });
};
