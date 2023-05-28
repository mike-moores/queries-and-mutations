import { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('pokemon_types', (table) => {
    table.integer('pokemon_id').unsigned().notNullable()
    table.integer('type_id').unsigned().notNullable()

    table.foreign('pokemon_id').references('pokemon.id')
    table.foreign('type_id').references('types.id')
  })
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('pokemon_types')
}
