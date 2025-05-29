import axios from 'axios';
import type { IFavStatus } from '../../types/favourites';
import type { ISearchFilters } from '../../types/searchFilters';
import type { IFilterPayload } from '../../types/filterResults';

export async function fetchPokemonList(offset: number, limit: number) {
  const { data } = await axios.get(
    `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`
  );
  return data;
}

export async function fetchPokemonDetail(name: string) {
  const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  return data;
}

export async function fetchIsFavStatus(id: number): Promise<IFavStatus> {
  const { data } = await axios.get<IFavStatus>(
    `http://localhost:4000/api/favorites/isFavorite?pokemonId=${id}&addedBy=Niraj Bhat`
  );
  return data;
}

export async function fetchSearchFilters(): Promise<ISearchFilters> {
  const { data } = await axios.get<ISearchFilters>(
    'http://localhost:4000/api/search/filters'
  );
  return data;
}

export async function postFilterOptions(filterOptions: IFilterPayload) {
  const { data } = await axios.post(
    'http://localhost:4000/api/search',
    filterOptions
  );
  return data;
}
