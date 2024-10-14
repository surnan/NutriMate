import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { useSelector } from "react-redux";

function Navigation() {
  const user = useSelector((state) => state.session.user);


  return (
    <div className="hFlex yellow">
      {/* <NavLink to="/">Home</NavLink> */}
      <NavLink to="/">Home</NavLink>


      <ProfileButton />
      {
        /* {user && (
          <>
            {user.profileImg?
            <img
              src={user.profileImg}
              style={{height: "70px", width: '70px', borderRadius: "50%"}}
            />: null}
          </>
        )} */
      }
    </div>
  );
}

export default Navigation;