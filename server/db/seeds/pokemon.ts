import { Knex } from 'knex'
import data from '../data/pokemon'

export async function seed(knex: Knex): Promise<void> {
  await knex('pokemon').del()

  const pokemon = data.map((p) => ({
    id: p.id,
    name: p.name,
  }))

  await knex('pokemon').insert(pokemon)
}
