import axios from 'axios';
import type { IFavPokemonData } from '../../types/favourites';

export async function postFavourtiesData(data: IFavPokemonData) {
  const res = await axios.post<IFavPokemonData>(
    'http://localhost:4000/api/favorites',
    data,
    {
      withCredentials: true,
    }
  );
  return res.data;
}

export async function fetchFavPokemons() {
  const { data } = await axios.get(
    'http://localhost:4000/api/favorites?addedBy=Niraj Bhat'
  );
  return data;
}
