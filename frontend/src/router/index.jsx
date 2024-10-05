import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import Splash from '../components/Splash';

import WorkoutPage_ from '../components/WorkoutPage_'
import WeightPage_ from '../components/WeightPage_'
import FoodPage_ from '../components/FoodPage_'




export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {path: "/", element: <Splash />},
      {path: "login", element: <LoginFormPage />},
      {path: "signup", element: <SignupFormPage />},
      {path: "workouts", element: <WorkoutPage_ />},
      {path: "weights", element: <WeightPage_ />},
      {path: "food", element: <FoodPage_ />},
      
      {path: "*", element: <p>--Page Not Found--</p>}

    ],
  },

]);
