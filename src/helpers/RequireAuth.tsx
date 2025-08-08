
import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
//это нужно чтобы пока не произошла 
// авторизация нельзя было пройти на основные страницы сайта
export const RequireAuth = ({children}:{children: ReactNode}) => {
    const jwt = localStorage.getItem('jwt')
    if(!jwt){
        return <Navigate to='/auth/login' replace/>
    }
    return children
}