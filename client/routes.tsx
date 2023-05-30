import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'

import AppLayout from './components/AppLayout'
import PokemonList from './components/PokemonList'

export const routes = createRoutesFromElements(
  <Route element={<AppLayout />}>
    <Route index element={<PokemonList />} />
  </Route>
)

export const router = createBrowserRouter(routes)
