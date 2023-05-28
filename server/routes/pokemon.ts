import express from 'express'
import * as db from '../db/db'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const pokemon = await db.getAllPokemon()
    res.json(pokemon)
  } catch (err) {
    console.log(err)
    res.status(500).send('Could not get pokemon')
  }
})

router.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  if (isNaN(id)) {
    res.sendStatus(400)
    return
  }

  try {
    const pokemon = await db.getPokemonById(parseInt(req.params.id))
    if (!pokemon) {
      res.sendStatus(404)
      return
    }
    res.json(pokemon)
  } catch (err) {
    console.log(err)
    res.status(500).send('Could not get pokemon')
  }
})

export default router
