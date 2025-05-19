import axios from 'axios';
import type { ISpeciesDetail } from '../../types/species';
import type { IPokemonTypesDetail } from '../../types/pokemonTypes';
import type { IEvolutionDetail } from '../../types/evolution';

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
