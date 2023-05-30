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
    const error = new Error('Could not get pokemon')
    // Arrange
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

describe('GET /api/v1/pokemon/:id', () => {})
