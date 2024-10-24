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
import DayLogPage from '../components/DayLogPage';
import DayLogPageForm from '../components/DayLogPageForm';
import DayLogFormGrub from '../components/_DayLogFormGrub';
import DayLogFormWorkout from '../components/DayLogFormWorkout';



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
      {path: "grubs", element: <GrubPage />},
      {path: "daylog", element: <DayLogPage />},
      {path: "workoutform", element: <WorkoutPageForm />},
      {path: "workoutform/:id", element: <WorkoutPageForm />},
      {path: "grubform", element: <GrubPageForm />},
      {path: "grubform/:id", element: <GrubPageForm />},
      

      {path: "daylog", element: <DayLogPage />},
      {path: "daylog/:id", element: <DayLogPageForm />},
      {path: "daylogform/:id", element: <DayLogPageForm />},
      {path: "daylogform", element: <DayLogPageForm />},


      {path: "DayLogFormWorkout", element: <DayLogFormWorkout />},
      {path: "DayLogFormWorkout/:id", element: <DayLogFormWorkout />},
      {path: "searchbar", element: <SearchBar />},
      {path: "line", element: <LineGraph />},
      {path: "DayLogFormGrub", element: <DayLogFormGrub />},
      {path: "*" , element: <p> == Page NOT Found ==</p>},
    ],
  },

]);
