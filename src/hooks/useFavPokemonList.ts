import { useQuery } from '@tanstack/react-query';
import { fetchFavPokemons } from '../services/favourites';

export const useFavPokemonList = () => {
  return useQuery({
    queryKey: ['favPokemons'],
    queryFn: fetchFavPokemons,
    staleTime: 60000,
  });
};
