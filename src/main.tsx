import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Homepage from './pages/Homepage/Homepage.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
// TODO
// import { QueryClient } from '@tanstack/react-query'
// const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage/>
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
   <RouterProvider router={router} />
  </React.StrictMode>,
)
