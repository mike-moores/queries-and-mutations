const pokemon = require('../data/pokemon')

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex('pokemon').del()
  await knex('pokemon').insert(pokemon)
}
