import { vi, describe, it, expect, beforeEach } from 'vitest'
import server from '../../server'
import request from 'supertest'

import * as db from '../../db/db'

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
    const error = new Error('Could not get pokemon')
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

  it('returns an error if getPokemonById throws', async () => {
    // Arrange
    const error = new Error('Could not get pokemon')
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
    expect(response.body.pokemon).toMatchInlineSnapshot('undefined')
  })

  it('returns an error if addPokemon throws', async () => {
    // Arrange
    const error = new Error('Could not add pokemon')
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
