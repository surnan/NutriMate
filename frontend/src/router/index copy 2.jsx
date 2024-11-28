// frontend/src/router/index.jsx
import { createBrowserRouter, Navigate } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';

import Splash from '../components/Splash';
import WeightPage from '../components/WeightPage'
import DayLogPage from '../components/DayLogPage';
import CardsPage from '../components/CardsGridPage'

import WeightPageForm from '../components/WeightPageForm';
import WorkoutPageForm from '../components/WorkoutPageForm'
import DayLogPageForm from '../components/DayLogPageForm';
import GrubPageForm from '../components/GrubPageForm';

// import SettingsPage from '../components/SettingsPage';
import SettingsPage from '../components/SettingsPage/SettingsPage';
import ProtectedRoute from '../components/_components/ProtectRoute/ProtectRoute'


export const router = createBrowserRouter([
  {
    element: (
      <Layout />
    ),

    children: [
      { path: "/", element: <Splash /> },
      { path: "login", element: <LoginFormPage /> },
      { path: "signup", element: <SignupFormPage /> },

      {
        path: "weights", element: (
          <ProtectedRoute>
            <WeightPage />
          </ProtectedRoute>
        )
      },
      {
        path: "daylog", element: (
          <ProtectedRoute>
            <DayLogPage />
          </ProtectedRoute>
        )
      },
      {
        path: "grubs", element: (
          <ProtectedRoute>
            <CardsPage stuff="grub" />
          </ProtectedRoute>
        )
      },
      {
        path: "workouts", element: (
          <ProtectedRoute>
            <CardsPage stuff="workout" />
          </ProtectedRoute>
        )
      },
      {
        path: "weightform", element: (
          <ProtectedRoute>
            <WeightPageForm />
          </ProtectedRoute>
        )
      },
      {
        path: "daylogform", element: (
          <ProtectedRoute>
            <DayLogPageForm />
          </ProtectedRoute>
        )
      },
      {
        path: "grubform", element: (
          <ProtectedRoute>
            <GrubPageForm />
          </ProtectedRoute>
        )
      },
      {
        path: "workoutform", element: (
          <ProtectedRoute>
            <WorkoutPageForm />
          </ProtectedRoute>
        )
      },
      {
        path: "grubform/:id", element: (
          <ProtectedRoute>
            <GrubPageForm />
          </ProtectedRoute>
        )
      },
      {
        path: "workoutform/:id", element:
          (
            <ProtectedRoute>
              <WorkoutPageForm />
            </ProtectedRoute>
          )
      },
      {
        path: "daylog/:id", element: (
          <ProtectedRoute>
            <DayLogPageForm />
          </ProtectedRoute>
        )
      },
      {
        path: "daylogform/:id", element: (
          <ProtectedRoute>
            <DayLogPageForm />
          </ProtectedRoute>
        )
      },

      {
        path: "settings", element: (
          <ProtectedRoute>
            <SettingsPage />
          </ProtectedRoute>
        )
      },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },

]);
