import { PartialPokemon, Pokemon } from '../../models/pokemon'
import db from './connection'

export async function getAllPokemon(): Promise<PartialPokemon[]> {
  return db('pokemon').select('*')
}

export async function getPokemonById(id: number): Promise<Pokemon | null> {
  const pokemon = await getAllPokemonWithTypes().where('pokemon.id', id).first()

  if (!pokemon) {
    return null
  }

  return {
    id: pokemon.id,
    name: pokemon.name,
    types: pokemon.types.split(','),
  }
}

function getAllPokemonWithTypes() {
  return db('pokemon')
    .join('pokemon_types', 'pokemon.id', 'pokemon_types.pokemon_id')
    .join('types', 'pokemon_types.type_id', 'types.id')
    .select(
      'pokemon.id',
      'pokemon.name',
      db.raw('GROUP_CONCAT(DISTINCT types.name) as types')
    )
    .groupBy('pokemon.id')
}
