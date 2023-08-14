import { vi, describe, it, expect, beforeEach } from 'vitest'
import server from '../../server.ts'
import request from 'supertest'

import * as db from '../../db/db.ts'

vi.mock('../../db/db')

beforeEach(async () => {
  vi.resetAllMocks()
})

describe('GET /api/v1/pokemon/', () => {
  it('returns all pokemon', async () => {
    // Arrange
    vi.mocked(db.getAllPokemon).mockResolvedValue([
      { id: 1, name: 'Bulbasaur' },
      { id: 2, name: 'Ivysaur' },
      { id: 3, name: 'Venusaur' },
    ])

    // Act
    const response = await request(server).get('/api/v1/pokemon/')

    // Assert
    expect(response.status).toBe(200)
    expect(response.body).toHaveLength(3)
    expect(response.body).toMatchInlineSnapshot(`
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

  it('returns an error if getAllPokemon throws', async () => {
    // Arrange
    const error = new Error('DATABASE ERROR: secret error info')
    vi.mocked(db.getAllPokemon).mockRejectedValue(error)
    vi.spyOn(console, 'log').mockImplementation(() => {})

    // Act
    const response = await request(server).get('/api/v1/pokemon/')

    // Assert
    expect(console.log).toHaveBeenCalledWith(error)
    expect(response.status).toBe(500)
    expect(response.text).toBe('Could not get pokemon')
  })
})

describe('GET /api/v1/pokemon/:id', () => {
  it('returns a pokemon by id', async () => {
    // Arrange
    vi.mocked(db.getPokemonById).mockResolvedValue({
      id: 1,
      name: 'Bulbasaur',
    })

    // Act
    const response = await request(server).get('/api/v1/pokemon/1')

    // Assert
    expect(vi.mocked(db.getPokemonById)).toHaveBeenCalledWith(1)
    expect(response.status).toBe(200)
    expect(response.body).toMatchInlineSnapshot(`
      {
        "id": 1,
        "name": "Bulbasaur",
      }
    `)
  })

  it('returns a 404 if the pokemon is not found', async () => {
    // Arrange
    vi.mocked(db.getPokemonById).mockResolvedValue(undefined)

    // Act
    const response = await request(server).get('/api/v1/pokemon/1')

    // Assert
    expect(response.status).toBe(404)
    expect(response.text).toBe('Not Found')
  })

  it('returns an error if getPokemonById throws', async () => {
    // Arrange
    const error = new Error('DATABASE ERROR: secret error info')
    vi.mocked(db.getPokemonById).mockRejectedValue(error)
    vi.spyOn(console, 'log').mockImplementation(() => {})

    // Act
    const response = await request(server).get('/api/v1/pokemon/1')

    // Assert
    expect(console.log).toHaveBeenCalledWith(error)
    expect(response.status).toBe(500)
    expect(response.text).toBe('Could not get pokemon')
  })
})

describe('POST /api/v1/pokemon/', () => {
  it('adds a pokemon', async () => {
    // Arrange
    vi.mocked(db.addPokemon).mockResolvedValue({ id: 152, name: 'Chikorita' })

    // Act
    const response = await request(server)
      .post('/api/v1/pokemon/')
      .send({ name: 'Chikorita' })

    // Assert
    expect(vi.mocked(db.addPokemon)).toHaveBeenCalledWith('Chikorita')
    expect(response.status).toBe(200)
    expect(response.body.pokemon).toMatchInlineSnapshot(`
      {
        "id": 152,
        "name": "Chikorita",
      }
    `)
  })

  it('returns an error if addPokemon throws', async () => {
    // Arrange
    const error = new Error('DATABASE ERROR: secret error info')
    vi.mocked(db.addPokemon).mockRejectedValue(error)
    vi.spyOn(console, 'log').mockImplementation(() => {})

    // Act
    const response = await request(server)
      .post('/api/v1/pokemon/')
      .send({ name: 'Bulbasaur' })

    // Assert
    expect(console.log).toHaveBeenCalledWith(error)
    expect(response.status).toBe(500)
    expect(response.text).toBe('Could not add pokemon')
  })
})

describe('PATCH /api/v1/pokemon/:id', () => {
  it('updates a pokemon', async () => {
    // Arrange
    vi.mocked(db.renamePokemon).mockResolvedValue({ id: 1, name: 'Bulby' })

    // Act
    const response = await request(server)
      .patch('/api/v1/pokemon/1')
      .send({ name: 'Bulby' })

    // Assert
    expect(vi.mocked(db.renamePokemon)).toHaveBeenCalledWith(1, 'Bulby')
    expect(response.status).toBe(200)
    expect(response.body.pokemon).toBeUndefined()
  })

  it('returns an error if renamePokemon throws', async () => {
    // Arrange
    const error = new Error('DATABASE ERROR: secret error info')
    vi.mocked(db.renamePokemon).mockRejectedValue(error)
    vi.spyOn(console, 'log').mockImplementation(() => {})

    // Act
    const response = await request(server)
      .patch('/api/v1/pokemon/1')
      .send({ name: 'Bulbasaur' })

    // Assert
    expect(console.log).toHaveBeenCalledWith(error)
    expect(response.status).toBe(500)
    expect(response.text).toBe('Could not rename pokemon')
  })
})

describe('DELETE /api/v1/pokemon/:id', () => {
  it('deletes a pokemon', async () => {
    // Arrange
    vi.mocked(db.deletePokemon).mockResolvedValue()

    // Act
    const response = await request(server).delete('/api/v1/pokemon/1')

    // Assert
    expect(vi.mocked(db.deletePokemon)).toHaveBeenCalledWith(1)
    expect(response.status).toBe(200)
    expect(response.body.pokemon).toBeUndefined()
  })

  it('returns an error if deletePokemon throws', async () => {
    // Arrange
    const error = new Error('DATABASE ERROR: secret error info')
    vi.mocked(db.deletePokemon).mockRejectedValue(error)
    vi.spyOn(console, 'log').mockImplementation(() => {})

    // Act
    const response = await request(server).delete('/api/v1/pokemon/1')

    // Assert
    expect(console.log).toHaveBeenCalledWith(error)
    expect(response.status).toBe(500)
    expect(response.text).toBe('Could not delete pokemon')
  })
})
