import axios from 'axios';
import type { IEvolutionDetail } from '../../types/evolution';
import type { ISpeciesDetail } from '../../types/species';
import type { IPokemonTypesDetail } from '../../types/pokemonTypes';

export async function fetchPokemons(offset: number, limit: number) {
  const { data } = await axios.get(
    `https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=${limit}`
  );
  return data;
}

export async function fetchPokemonDetail(name: string) {
  const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
  return data;
}

export async function fetchPokemonSpecies(
  name: string
): Promise<ISpeciesDetail> {
  const { data } = await axios.get<ISpeciesDetail>(
    `https://pokeapi.co/api/v2/pokemon-species/${name}`
  );
  return data;
}

export async function fetchPokemonEvolution(
  url: string
): Promise<IEvolutionDetail> {
  const { data } = await axios.get<IEvolutionDetail>(`${url}`);
  return data;
}

export async function fetchPokemonTypesDetail(
  typeName: string
): Promise<IPokemonTypesDetail> {
  const { data } = await axios.get(
    `https://pokeapi.co/api/v2/type/${typeName}`
  );
  return data;
}

export async function postFavourtiesData(data: {
  id: number;
  name: string;
  addedBy: string;
}) {
  console.log('adding');
  const res = await axios.post('http://localhost:4000/api/favorites', data, {
    withCredentials: true,
  });
  return res.data;
}

export async function fetchFavPokemons() {
  const { data } = await axios.get(
    'http://localhost:4000/api/favorites?addedBy=Niraj Bhat'
  );
  return data;
}
