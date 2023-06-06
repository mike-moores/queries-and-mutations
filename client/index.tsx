import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import { router } from './routes'

const queryClient = new QueryClient()

const root = createRoot(document.getElementById('app') as HTMLElement)
root.render(
  <QueryClientProvider client={queryClient}>
    <RouterProvider router={router} />
    <ReactQueryDevtools initialIsOpen={false} />
  </QueryClientProvider>
)
