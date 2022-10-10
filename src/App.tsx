import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'

import { useAppDispatch } from './hooks/reduxHooks'

import { appActions } from './redux/app-reducer/app-reducer'

import Login from './components/Authentication/Login/Login'
import Register from './components/Authentication/Register/Register'
import Alert from './components/Alert/Alert'
import Home from './components/Home/Home'

function App() {
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
  /*  useEffect(() => {
    dispatch(initializeApp())
  }, [dispatch, isAppInitialized])*/

  /*  if (!isAppInitialized) return <Loading />
   */
  return (
    <div className='w-full'>
      <div className='z-10'>
        <Alert />
        <Routes>
          <Route path='/' element={<Navigate to='/home' />} />
          <Route path='/home' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='*' element={<div>404</div>} />
        </Routes>
      </div>
    </div>
  )
}

export default App
