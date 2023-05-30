import { Pokemon } from '../../models/pokemon'
import db from './connection'

export async function getAllPokemon(): Promise<Pokemon[]> {
  return db('pokemon').select('*')
}

export async function getPokemonById(id: number): Promise<Pokemon> {
  return db('pokemon').where({ id }).first()
}

export async function addPokemon(name: string): Promise<void> {
  await db('pokemon').insert({ name })
}

export async function renamePokemon(id: number, name: string): Promise<void> {
  await db('pokemon').where({ id }).update({ name })
}

export async function deletePokemon(id: number): Promise<void> {
  await db('pokemon').where({ id }).delete()
}
