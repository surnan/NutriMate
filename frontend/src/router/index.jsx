import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import Splash from '../components/Splash';
import WeightPage from '../components/WeightPage'
import WeightPageForm from '../components/WeightPageForm/WeightPageForm';
import WorkoutPage from '../components/WorkoutPage'
import WorkoutPageForm from '../components/WorkoutPageForm'
import GrubPage from '../components/GrubPage'



export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {path: "/", element: <Splash />},
      {path: "login", element: <LoginFormPage />},
      {path: "signup", element: <SignupFormPage />},
      {path: "weights", element: <WeightPage />},
      {path: "weightform", element: <WeightPageForm />},
      {path: "workouts", element: <WorkoutPage />},
      {path: "workoutform", element: <WorkoutPageForm />},
      {path: "grubs", element: <GrubPage />},
      {path: "*" , element: <p> == Page NOT Found ==</p>},
    ],
  },

]);
