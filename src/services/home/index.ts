import axios from 'axios';

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
