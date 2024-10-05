import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { useSelector } from "react-redux";

function Navigation() {
  const user = useSelector((state) => state.session.user);


  return (
    <div className="h-grid">
      
        <NavLink to="/">Home</NavLink>
      
      
        <ProfileButton />
      
      {user && (
        <li>
          {user.profileImg?
          <img
            src={user.profileImg}
            style={{height: "70px", width: '70px', borderRadius: "50%"}}
          />: null}
        </li>
      )}
    </div>
  );
}

export default Navigation;