import { useState } from 'react'
import styles from './PokemonListItem.module.css'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deletePokemon, renamePokemon } from '../apis/pokemon.ts'

interface Props {
  id: number
  name: string
}
export default function PokemonListItem({ id, name }: Props) {
  const [editing, setEditing] = useState(false)
  const [text, setText] = useState(name)

  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: deletePokemon,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pokemon'] })
    },
  })

  const handleDeleteClick = () => {
    mutation.mutate({ id })

    console.log('Deleting the Pokemon: ', id)
  }
  const addMutation = useMutation({
    mutationFn: renamePokemon,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['pokemon'] })
    },
  })

  const handleEditSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    addMutation.mutate({ id, newName: text })
    console.log('submitting changes', text)

    setEditing(false)
  }

  const handleStopEditingClick = () => {
    setEditing(false)
    setText(name)
  }

  const handleStartEditingClick = () => {
    setEditing(true)
  }

  return (
    <div>
      {editing ? (
        <form onSubmit={handleEditSubmit} className={styles.form}>
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button type="submit">Save</button>
          <button type="button" onClick={handleStopEditingClick}>
            Stop Editing
          </button>
        </form>
      ) : (
        <p>
          {id} - {name} -{' '}
          <span className={styles.buttons}>
            <button onClick={handleStartEditingClick}>Rename</button>
            <button onClick={handleDeleteClick}>Delete</button>
          </span>
        </p>
      )}
    </div>
  )
}
