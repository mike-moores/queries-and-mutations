import { Pokemon } from '../../models/pokemon.ts'
import PokemonListItem from './PokemonListItem.tsx'

export default function PokemonList() {
  // TODO: fetch the list of pokemon from the server
  const pokemon: Pokemon[] = [
    { id: 1, name: 'Bulbasaur' },
    {
      id: 2,
      name: 'Ivysaur',
    },
    {
      id: 3,
      name: 'Venusaur',
    },
  ]

  return (
    <div>
      <h2>Pokemon List</h2>
      {pokemon.map((p) => (
        <PokemonListItem key={p.id} id={p.id} name={p.name} />
      ))}
    </div>
  )
}
