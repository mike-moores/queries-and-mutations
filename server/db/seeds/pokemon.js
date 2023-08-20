import pokemon from '../data/pokemon.js'

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function seed(knex) {
  await knex('pokemon').del()
  await knex('pokemon').insert(pokemon)
}
