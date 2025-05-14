import axios from 'axios';
import type { IEvolutionDetail } from '../../types/evolution';
import type { ISpeciesDetail } from '../../types/species';

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
