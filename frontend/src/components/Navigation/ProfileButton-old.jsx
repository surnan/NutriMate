// frontend/src/components/Navigation/ProfileButton.jsx

// "useRef" & "ref={ulRef}" <=== create alias to DOM element
// "e.target" <=== DOM element that was clicked.  You will always be a DOM element
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { thunkLogout } from "../../redux/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import "./Navigation.css";
import { useNavigate } from "react-router-dom"

function ProfileButton() {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const nav = useNavigate();
  const ulRef = useRef();
  
  const user = useSelector((store) => store.session.user);

  useEffect = (() => {
    console.log("USEEFFECT: user = ", user)

  }, [user?.id, dispatch])



  const [isAnimationActive, setIsAnimationActive] = useState(true);


  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    // setAllowAnimate(false)
    if (isAnimationActive) setIsAnimationActive(false);
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const closeMenu = () => setShowMenu(false);

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout());
    closeMenu();
    nav("/")
  };

  return (
    <div className="profile_anchor">


      {showMenu && (
        <ul className={"profile-dropdown"} ref={ulRef}>
          {user ? (
            <div className="profile_dropdown_grid">
              <p>{user.email}</p>
              <button className="_button black_font" onClick={logout}>Log Out</button>
            </div>
          ) : (
            <div className="popupDiv">
              <OpenModalMenuItem
                itemText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
              <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </div>
          )}
        </ul>
      )}
    </div>
  );
}

export default ProfileButton;
