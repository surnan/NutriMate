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
import GrubPageForm from '../components/GrubPageForm/GrubPageForm';
import SearchBar from '../components/SearchBar';
import LineGraph from '../components/LineGraph';


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
      {path: "grubform", element: <GrubPageForm />},
      {path: "searchbar", element: <SearchBar />},
      {path: "line", element: <LineGraph />},
      {path: "*" , element: <p> == Page NOT Found ==</p>},
    ],
  },

]);
