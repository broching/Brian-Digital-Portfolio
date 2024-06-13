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
import ViewExperience from './Pages/Experience/ViewExperience'
import CreateProjectPage from './Pages/Project/CreateProjectPage'
import ProjectListing from './Pages/Project/ProjectListing'
import ViewProject from './Pages/Project/ViewProject'
import EditProjectPage from './Pages/Project/EditProjectPage'


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
        path: "experience/view/:id",
        element: (
            <ViewExperience />
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
      {
        path: "project/view/:id",
        element: (
            <ViewProject />
        )
      },
      {
        path: "project/create",
        element: (
          <ProtectedRoute>
            <CreateProjectPage />
          </ProtectedRoute>
        )
      },
      {
        path: "project/listing",
        element: (
          <ProtectedRoute>
            <ProjectListing />
          </ProtectedRoute>
        )
      },
      {
        path: "project/edit/:id",
        element: (
          <ProtectedRoute>
            <EditProjectPage />
          </ProtectedRoute>
        )
      },
    ]
  }
])

export default router;