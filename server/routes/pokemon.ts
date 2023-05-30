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
    const pokemon = await db.getPokemonById(id)
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

router.post('/', async (req, res) => {
  const name = req.body.name
  if (!name) {
    res.sendStatus(400)
    return
  }

  try {
    await db.addPokemon(name)
    res.sendStatus(200)
  } catch (err) {
    console.log(err)
    res.status(500).send('Could not add pokemon')
  }
})

router.patch('/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  if (isNaN(id)) {
    res.sendStatus(400)
    return
  }

  const name = req.body.name
  if (!name) {
    res.sendStatus(400)
    return
  }

  try {
    await db.renamePokemon(id, name)
    res.sendStatus(200)
  } catch (err) {
    console.log(err)
    res.status(500).send('Could not rename pokemon')
  }
})

router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  if (isNaN(id)) {
    res.sendStatus(400)
    return
  }

  try {
    await db.deletePokemon(id)
    res.sendStatus(200)
  } catch (err) {
    console.log(err)
    res.status(500).send('Could not delete pokemon')
  }
})

export default router
