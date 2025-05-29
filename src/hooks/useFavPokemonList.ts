import { useQuery } from '@tanstack/react-query';
import { fetchFavPokemons } from '../services/favourites';
import type { IFavPokemonData } from '../types/favourites';

export const useFavPokemonList = () => {
  return useQuery<IFavPokemonData[]>({
    queryKey: ['favPokemons'],
    queryFn: fetchFavPokemons,
  });
};
