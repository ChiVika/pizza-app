import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Menu } from './pages/Menu/Menu.tsx'
import { Cart } from './pages/Cart/Cart.tsx'
import { Error } from './pages/Error/Error';
import { Layout } from './layout/Menu/Layout.tsx'
import { Product } from './pages/Product/Product.tsx'
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    children: [
      {
        path: '/',
        element: <Menu/>,
      },
      {
        path: '/cart',
        element: <Cart/>,
      },
      {
        path: '*',
        element: <Error/>,
      },
      {
        path: '/product/:id',
        element: <Product/>
      }
    ]
  }

])
createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <RouterProvider router={router}/>
  </StrictMode>,
)
