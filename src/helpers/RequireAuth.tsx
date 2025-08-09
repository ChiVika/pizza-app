
import type { RootState } from '../store/store';
import type { ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
//это нужно чтобы пока не произошла 
// авторизация нельзя было пройти на основные страницы сайта
export const RequireAuth = ({children}:{children: ReactNode}) => {
    const jwt = useSelector((s: RootState) => s.user.jwt);
    if(!jwt){
        return <Navigate to='/auth/login' replace/>
    }
    return children
}