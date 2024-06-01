import React from 'react'
import { createBrowserRouter } from "react-router-dom"
import App from './App'
import Homepage from './Pages/Homepage'
import LoginPage from './Pages/LoginPage'
import SkillsPage from './Pages/Skills/SkillsPage'
import CreateSkillsPage from './Pages/Skills/CreateSkillPage'


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
      {
        path: "skills",
        element: <SkillsPage />,
      },
      {
        path: "skills/create",
        element: <CreateSkillsPage />
      },
    ]
  }
])

export default router;