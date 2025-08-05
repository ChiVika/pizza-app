import { lazy, StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { Cart } from './pages/Cart/Cart.tsx'
import { Error as ErrorPage } from './pages/Error/Error';
import { Layout } from './layout/Menu/Layout.tsx'
import { Product } from './pages/Product/Product.tsx'
import axios from 'axios'
import { PREFIX } from './helpers/API.ts'

const Menu = lazy(() => import("./pages/Menu/Menu"))
const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout/>,
    children: [
      {
        path: '/',
        element: <Suspense fallback={<>Загрузка</>}><Menu/></Suspense>,
      },
      {
        path: '/cart',
        element: <Cart/>,
      },
      {
        path: '*',
        element: <ErrorPage/>,
      },
      {
        path: '/product/:id',
        element: <Product/>,
        errorElement: <>Ошибка</>,
        loader: async({params}) => {
          
          const {data} = await axios.get(`${PREFIX}/products/${params.id}`)
          return data
        }
      }
    ]
  }

])
createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <RouterProvider router={router}/>
  </StrictMode>,
)
