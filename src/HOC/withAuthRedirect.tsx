import React, { ComponentType } from 'react'
import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { getIsLoggedIn } from '../redux/auth-reducer/auth-selector'
import { getIsAppInitialized } from '../redux/app-reducer/app-selector'
import { useAppSelector } from '../hooks/reduxHooks'

function withAuthRedirect<P extends Object>(Component: ComponentType<P>) {
  return function (props: P) {
    const isAppInitialized = useAppSelector(getIsAppInitialized)
    const isLoggedIn = useAppSelector(getIsLoggedIn)
    if (!isLoggedIn && isAppInitialized) return <Navigate to='/login' />
    return <Component {...props} />
  }
}
export default withAuthRedirect
