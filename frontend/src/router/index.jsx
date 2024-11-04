// frontend/src/router/index.jsx
import { createBrowserRouter } from 'react-router-dom';
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


export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      { path: "/", element: <Splash /> },
      { path: "login", element: <LoginFormPage /> },
      { path: "signup", element: <SignupFormPage /> },
      
      { path: "weights", element: <WeightPage /> },
      { path: "daylog", element: <DayLogPage /> },
      { path: "grubs", element: <CardsPage stuff="grub"/> },
      { path: "workouts", element: <CardsPage stuff="workout"/> },
      
      
      { path: "weightform", element: <WeightPageForm /> },
      { path: "daylogform", element: <DayLogPageForm /> },
      { path: "grubform", element: <GrubPageForm /> },
      { path: "workoutform", element: <WorkoutPageForm /> },
      
      { path: "grubform/:id", element: <GrubPageForm /> },
      { path: "workoutform/:id", element: <WorkoutPageForm /> },
      { path: "daylog/:id", element: <DayLogPageForm /> },
      { path: "daylogform/:id", element: <DayLogPageForm /> },
      
      { path: "*", element: <p> == Page NOT Found ==</p> },
    ],
  },

]);
