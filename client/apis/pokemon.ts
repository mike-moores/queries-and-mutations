import request from 'superagent'
import type { Pokemon } from '../../models/pokemon'

export async function getAllPokemon() {
  const response = await request.get('/api/pokemon')

  return response.body as Pokemon[]
}

interface AddPokemon {
  name: Pokemon['name']
}
export async function addPokemon({ name }: AddPokemon): Promise<void> {
  await request.post('/api/v1/pokemon').send({ name })
}

export async function renamePokemon({
  id,
  newName,
}: {
  id: number
  newName: string
}) {
  await request.patch(`/api/v1/pokemon/${id}`).send({ name: newName })
}

export async function deletePokemon({ id }: { id: number }) {
  await request.delete(`/api/v1/pokemon/${id}`)
}
