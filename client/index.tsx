import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import { router } from './routes'

const root = createRoot(document.getElementById('app') as HTMLElement)
root.render(<RouterProvider router={router} />)
