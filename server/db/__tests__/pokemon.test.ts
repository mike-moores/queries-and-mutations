import { it, describe, expect, beforeEach } from 'vitest'
import connection from '../connection'
import * as db from '../db'

beforeEach(async () => {
  await connection.migrate.rollback()
  await connection.migrate.latest()
  await connection.seed.run()
})

describe('db', () => {
  describe('getAllPokemon', () => {
    it('gets all the things', async () => {
      const results = await db.getAllPokemon()
      expect(results).toHaveLength(151)
      expect(results.slice(0, 3)).toMatchInlineSnapshot(`
        [
          {
            "id": 1,
            "name": "Bulbasaur",
          },
          {
            "id": 2,
            "name": "Ivysaur",
          },
          {
            "id": 3,
            "name": "Venusaur",
          },
        ]
      `)
    })
  })

  describe('getPokemonById', () => {
    it('gets a pokemon by id', async () => {
      const mew = await db.getPokemonById(151)
      expect(mew.name).toBe('Mew')

      const dratini = await db.getPokemonById(147)
      expect(dratini.name).toBe('Dratini')

      const bulbasaur = await db.getPokemonById(1)
      expect(bulbasaur.name).toBe('Bulbasaur')
    })

    it('returns undefined if the pokemon does not exist', async () => {
      const nonExistent = await db.getPokemonById(999)
      expect(nonExistent).toBeUndefined()
    })
  })

  describe('addPokemon', () => {
    it('adds a pokemon', async () => {
      const before = await db.getAllPokemon()
      expect(before).toHaveLength(151)

      const pokemon = await db.addPokemon('Chikorita')
      expect(pokemon).toMatchInlineSnapshot()

      const chikorita = await db.getPokemonById(152)
      expect(chikorita.name).toBe('Chikorita')

      const after = await db.getAllPokemon()
      expect(after).toHaveLength(152)
    })
  })

  describe('renamePokemon', () => {
    it('renames a pokemon', async () => {
      const before = await db.getPokemonById(1)
      expect(before.name).toBe('Bulbasaur')

      await db.renamePokemon(1, 'Bulby')

      const after = await db.getPokemonById(1)
      expect(after.name).toBe('Bulby')

      const all = await db.getAllPokemon()
      expect(all).toHaveLength(151)
    })
  })

  describe('deletePokemon', () => {
    it('deletes a pokemon', async () => {
      const before = await db.getAllPokemon()
      expect(before).toHaveLength(151)

      await db.deletePokemon(1)

      const after = await db.getAllPokemon()
      expect(after).toHaveLength(150)

      const bulbasaur = await db.getPokemonById(1)
      expect(bulbasaur).toBeUndefined()
    })
  })
})
