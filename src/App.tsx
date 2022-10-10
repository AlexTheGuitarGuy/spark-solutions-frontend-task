import React, { useEffect } from 'react'
import './App.css'

import { useAppDispatch, useAppSelector } from './hooks/reduxHooks'

import { initializeApp, appActions } from './redux/app-reducer/app-reducer'
import { getIsAppInitialized } from './redux/app-reducer/app-selector'

import Loading from './components/common/Loading/Loading'
import Login from './components/Login/Login'

function App() {
  const isAppInitialized = useAppSelector(getIsAppInitialized)

  const dispatch = useAppDispatch()

  useEffect(() => {
    const handleRejection = (event: PromiseRejectionEvent) => {
      if (event?.reason?.substring) {
        if (event.reason.substring(0, 18) === 'Invalid url format')
          dispatch(appActions.setAlert({ message: `Couldn't upload profile data`, type: 'error' }))
        else dispatch(appActions.setAlert({ message: event.reason, type: 'error' }))
        event.preventDefault()
      }
    }

    window.addEventListener('unhandledrejection', handleRejection)

    return () => {
      window.removeEventListener('unhandledrejection', handleRejection)
    }
  })

  useEffect(() => {
    dispatch(initializeApp())
  }, [dispatch, isAppInitialized])

  /*  if (!isAppInitialized) return <Loading />
   */
  return (
    <div>
      <Login />
    </div>
  )
}

export default App
