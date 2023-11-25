import { getAllPokemon } from '../apis/pokemon.ts'
import PokemonListItem from './PokemonListItem.tsx'
import { useQuery } from '@tanstack/react-query'
import LoadingSpinner from './LoadingSpinner.tsx'

export default function PokemonList() {
  const {
    data: pokemon,
    isLoading,
    error,
  } = useQuery({ queryKey: ['pokemon'], queryFn: () => getAllPokemon() })

  if (error) {
    return <p>Error while trying to get pokemon</p>
  }

  if (isLoading || !pokemon) {
    return <LoadingSpinner />
  }

  return (
    <div>
      <h2>Pokemon List</h2>
      {pokemon.map((p) => (
        <PokemonListItem key={p.id} id={p.id} name={p.name} />
      ))}
    </div>
  )
}
