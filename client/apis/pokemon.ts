import request from 'superagent'
import type { Pokemon, PartialPokemon } from '../../models/pokemon'

export async function fetchAllPokemon(generation: number) {
  return request
    .get(`/api/v1/pokemon/${generation}`)
    .then((res) => res.body as PartialPokemon[])
}

export async function fetchPokemonByName(name: string) {
  return request
    .get(`/api/v1/pokemon/${name}`)
    .then((res) => res.body as Pokemon)
}
