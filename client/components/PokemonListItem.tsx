import { useState } from 'react'
import styles from './PokemonListItem.module.css'

interface Props {
  id: number
  name: string
}
export default function PokemonListItem({ id, name }: Props) {
  const [editing, setEditing] = useState(false)
  const [text, setText] = useState(name)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // TODO: submit the form to change the name
    console.log('submitting', text)

    setEditing(false)
  }

  const handleDeleteClick = () => {
    // TODO: submit the form to delete the pokemon
    console.log('deleting', id)
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
        <form onSubmit={handleSubmit} className={styles.form}>
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
