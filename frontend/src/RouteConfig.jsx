import React from 'react'
import { createBrowserRouter } from "react-router-dom"
import App from './App'
import Homepage from './Pages/Homepage'
import LoginPage from './Pages/LoginPage'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Homepage />
      },
      {
        path: "login",
        element: <LoginPage />
      },
    ]
  }
])

export default router;