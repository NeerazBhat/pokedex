import { useQueries } from '@tanstack/react-query';
import { fetchPokemonDetail } from '../services/home';

export const usePokemonDetail = (results: []) => {
  return useQueries({
    queries: results.map((pokemon: { name: string }) => ({
      queryKey: ['pokemon', pokemon.name],
      queryFn: () => fetchPokemonDetail(pokemon.name),
      staleTime: 30000,
    })),
  });
};
