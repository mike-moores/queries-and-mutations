import { Knex } from 'knex'
import data from '../data/pokemon'

export async function seed(knex: Knex): Promise<void> {
  await knex('types').del()

  // Create a unique set of types
  // e.g., Set { 'Grass', 'Poison', 'Fire', 'Flying', 'Water', 'Bug', 'Normal' }
  const typeSet = new Set<string>()
  data.forEach((p) => {
    p.type.forEach((t) => {
      typeSet.add(t)
    })
  })

  // Create an array of types
  // e.g., [ { id: 1, name: 'Grass' }, { id: 2, name: 'Poison' }, ... ]
  const types = Array.from(typeSet).map((type, i) => ({
    id: i + 1,
    name: type,
  }))

  const pokemonTypes = data
    .map((p) => {
      return p.type.map((t) => ({
        pokemon_id: p.id,
        type_id: types.find((type) => type.name === t)?.id,
      }))
    })
    .flat()

  await knex('types').insert(types)
  await knex('pokemon_types').insert(pokemonTypes)
}
