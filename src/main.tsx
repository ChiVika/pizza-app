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
import { AuthLayout } from './layout/Auth/AuthLayout.tsx'
import Login from './pages/Login/Login.tsx'
import Register from './pages/Register/Register.tsx'
import { RequireAuth } from './helpers/requireAuth.tsx'

const Menu = lazy(() => import("./pages/Menu/Menu"))
const router = createBrowserRouter([
  {
    path: '/',
    element: <RequireAuth><Layout/></RequireAuth>,
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
        path: '/product/:id',
        element: <Product/>,
        errorElement: <>Ошибка</>,
        loader: async({params}) => {
          
          const {data} = await axios.get(`${PREFIX}/products/${params.id}`)
          return data
        }
      }
    ]
  },
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <Login/>
      },
      {
        path: 'registration',
        element: <Register/>
      }
    ]
  },
  {
    path: '*',
    element: <ErrorPage/>,
  }

])
createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <RouterProvider router={router}/>
  </StrictMode>,
)
