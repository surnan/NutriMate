// frontend/src/components/Splash/Splash.jsx
import "./Splash.css"
import { useSelector } from 'react-redux';
import SplashGifDiv from "./SplashGifDiv";
import DayLogPage from "../DayLogPage/DayLogPage";
import { useEffect, useState } from "react";
import { useTheme } from "../../context/ThemeContext"

const Splash = () => {
  const sessionUser = useSelector((state) => state.session.user);

  const { theme } = useTheme();


  useEffect(() => {
    console.log(`Theme ===> `, theme)
    // document.body.classList.remove("light-mode", "dark-mode");
    // document.body.classList.add(theme === "dark" ? "dark-mode" : "light-mode");

    if (theme === 'dark'){
      
    }


}, [theme])

  return (
    // <div className="mainBodyStyle relative">
    <div className="mainBodyStyle relative splash-colors">
      {!sessionUser &&
        // <h1 className="twenty_padding ">11Login to track your health!!</h1>
        <h4 className="twenty_padding ">$$Login to track your health!!</h4>
      }

      {sessionUser && <DayLogPage />}

      {!sessionUser && <SplashGifDiv />}
    </div>
  );

}

export default Splash;
