import axios from 'axios';
import type { IFavPokemonData } from '../../types/favourites';

export async function postToFavourtiesData(data: IFavPokemonData) {
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

export async function deleteFromFavouritesData(id: number) {
  const { data } = await axios.delete(
    `http://localhost:4000/api/favorites?id=${id}&addedBy=Niraj Bhat`
  );
  return data;
}
