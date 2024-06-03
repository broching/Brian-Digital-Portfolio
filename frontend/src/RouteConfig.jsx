import React from 'react'
import { createBrowserRouter } from "react-router-dom"
import App from './App'
import Homepage from './Pages/Homepage'
import LoginPage from './Pages/LoginPage'
import SkillsPage from './Pages/Skills/SkillsPage'
import CreateSkillsPage from './Pages/Skills/CreateSkillPage'
import SkillsListing from './Pages/Skills/SkillsListing'
import EditSkillPage from './Pages/Skills/EditSkillPage'
import ProtectedRoute from './ProtectedRoute'
import CreateExperiencePage from './Pages/Experience/CreateExperiencePage'
import ExperienceListing from './Pages/Experience/ExperienceListing'
import EditExperiencePage from './Pages/Experience/EditExperiencePage'


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
        element: (
          <ProtectedRoute>
            <CreateSkillsPage />
          </ProtectedRoute>
        )
      },
      {
        path: "skills/listing",
        element: (
          <ProtectedRoute>
            <SkillsListing />
          </ProtectedRoute>
        )
      },
      {
        path: "skills/edit/:id",
        element: (
          <ProtectedRoute>
            <EditSkillPage />
          </ProtectedRoute>
        )
      },
      {
        path: "experience",
        element: (
          <ProtectedRoute>
            <EditSkillPage />
          </ProtectedRoute>
        )
      },
      {
        path: "experience/view/:id",
        element: (
          <ProtectedRoute>
            <EditSkillPage />
          </ProtectedRoute>
        )
      },
      {
        path: "experience/create",
        element: (
          <ProtectedRoute>
            <CreateExperiencePage />
          </ProtectedRoute>
        )
      },
      {
        path: "experience/listing",
        element: (
          <ProtectedRoute>
            <ExperienceListing />
          </ProtectedRoute>
        )
      },
      {
        path: "experience/edit/:id",
        element: (
          <ProtectedRoute>
            <EditExperiencePage />
          </ProtectedRoute>
        )
      },
      
    ]
  }
])

export default router;