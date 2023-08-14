import { Pokemon } from '../../models/pokemon.ts'
import db from './connection.ts'

export async function getAllPokemon(): Promise<Pokemon[]> {
  return db('pokemon').select('*')
}

export async function getPokemonById(id: number): Promise<Pokemon | undefined> {
  return db('pokemon').where({ id }).first()
}

export async function addPokemon(name: string): Promise<Pokemon> {
  return db('pokemon').insert({ name }).returning(['id', 'name'])
}

export async function renamePokemon(
  id: number,
  name: string
): Promise<Pokemon | undefined> {
  return db('pokemon').where({ id }).update({ name }).returning(['id', 'name'])
}

export async function deletePokemon(id: number): Promise<void> {
  await db('pokemon').where({ id }).delete()
}
