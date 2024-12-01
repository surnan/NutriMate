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
import ProtectRoute from '../components/_components/ProtectRoute/ProtectRoute';

export const router = createBrowserRouter([
  {
    element: (
      <Layout />
    ),
    children: [
      //Public Routes
      { path: "/", element: <Splash /> },
      { path: "login", element: <LoginFormPage /> },
      { path: "signup", element: <SignupFormPage /> },

      //Protected Routes
      {
        element: <ProtectRoute/>,
        children: [
          { path: "daylog", element: <DayLogPage /> },
          { path: "daylog/:id", element: <DayLogPageForm /> },
          { path: "daylogform", element: <DayLogPageForm /> },
          { path: "daylogform/:id", element: <DayLogPageForm /> },    
          
          { path: "grubs", element: <CardsPage stuff="grub" /> },
          { path: "grubform", element: <GrubPageForm /> },
          { path: "grubform/:id", element: <GrubPageForm /> },

          { path: "settings", element: <SettingsPage /> },
      
          { path: "workouts", element: <CardsPage stuff="workout" /> },
          { path: "workoutform", element: <WorkoutPageForm /> },
          { path: "workoutform/:id", element: <WorkoutPageForm /> },
          
          { path: "weights", element: <WeightPage /> },
          { path: "weightform", element: <WeightPageForm /> },
        ]
      },
      { path: "*", element: <Navigate to="/" replace /> },
    ],
  },

]);
