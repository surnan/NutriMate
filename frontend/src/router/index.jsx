import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import Layout from './Layout';
import Splash from '../components/Splash';
import WeightPage from '../components/WeightPage'
import WorkoutPage from '../components/WorkoutPage'
import WeightPageForm from '../components/WeightPageForm/WeightPageForm';


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
      {path: "*" , element: <p> == Page NOT Found ==</p>},
    ],
  },

]);
