import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import Splash from '../components/Splash';
import WeightCard from '../components/WeightCard';

import WorkoutPage_ from '../components/WorkoutPage_'
import WeightPage_ from '../components/WeightPage_'
import WeightPage from '../components/WeightPage'
import FoodPage_ from '../components/FoodPage_'




export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {path: "/", element: <Splash />},
      {path: "login", element: <LoginFormPage />},
      {path: "signup", element: <SignupFormPage />},
      {path: "weights", element: <WeightPage />},
      {path: "weights_", element: <WeightPage_ />},
      {path: "*" , element: <p> == Page NOT Found ==</p>},
    ],
  },

]);
