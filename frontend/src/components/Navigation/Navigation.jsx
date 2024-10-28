//frontend/src/components/Navigation/Navigation.jsx
import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { useDispatch, useSelector } from "react-redux";
import logo from "../../fe_images/nutimate_logo.png";
import { useEffect } from "react";
import { thunkAuthenticate } from "../../redux/session";

function Navigation() {
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(thunkAuthenticate());
    //dispatch([user]) causes infinite renders
  }, [dispatch, user?.email]);

  useEffect(()=>{
    console.log("...Navigation->user = ", user)
  }, [user])




  return (
    <div className="nav_flex ltskyblue">
      <NavLink to="/">
        <img
          src={logo}
          alt="Home"
          className="logo"
        />
      </NavLink>
      <div className="navigation_right">
        <ProfileButton />
        {user && (
          <p>
            {user.profileImg ?
              <img
                src={user.profileImg}
                style={{ height: "70px", width: '70px', borderRadius: "50%" }}
              /> : null}
          </p>
        )}
      </div>
    </div>
  );
}

export default Navigation;