//frontend/src/components/Navigation/Navigation.jsx
import { NavLink, useNavigate } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { thunkAuthenticate } from "../../redux/session";

import { useTheme } from "../../context/ThemeContext"

// import logo from "../../fe_images/nutimate_logo.png";
import blue_logo from "../../fe_images/blue_logo.png"
import dark_logo from "../../fe_images/dark_logo.png"



function Navigation() {
  const user = useSelector((state) => state.session.user);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    console.log(`Navigation -> Theme ===> `, theme)
  }, [theme])

  useEffect(() => {
    dispatch(thunkAuthenticate());
    //dispatch([user]) causes infinite renders
  }, [dispatch, user?.email]);

  const currentLogo = theme === "dark" ? dark_logo : blue_logo;


  return (
    <div
      className={`nav_flex navBlue
      ${theme === "dark" ? "navBlack smoke_font" : ""}
    `}>
      <NavLink to="/">
        <img
          src={currentLogo}
          alt="Home"
          className="logo logo_size"
        />
      </NavLink>
      <div className="navigation_right">
        <ProfileButton />
        {user && (
          <p className="p_profileImg">
            {user.profileImg ?
              <img
                src={user.profileImg}
                style={{ height: "70px", width: '70px', borderRadius: "50%" }}
                className="clickable"
                onClick={() => navigate("/settings")}
              /> : null}
          </p>
        )}
      </div>
    </div>
  );
}

export default Navigation;