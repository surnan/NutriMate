import { NavLink } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import "./Navigation.css";
import { useSelector } from "react-redux";

function Navigation() {
  return (
    <>
        <NavLink to="/">Home</NavLink>
        <ProfileButton />
    </>
  );
}

export default Navigation;
