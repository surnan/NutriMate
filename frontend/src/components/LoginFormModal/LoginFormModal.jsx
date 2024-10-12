import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginFormModal.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleLogin = async (e, loginEmail, loginPassword) => {
    e.preventDefault();
    const serverResponse = await dispatch(
      thunkLogin({
        email: loginEmail || email,
        password: loginPassword || password
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  return (
    <div className="login_modal_popup">
      <form className="login_hGrid popupDiv" onSubmit={(e) => handleLogin(e)}>
        <h1 className="center">Log In</h1>
        <label>
          Email:&nbsp;&nbsp;
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password:&nbsp;&nbsp;
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button
          className="orange"
          type="submit">
          Log In
        </button>
        <button
          className="ltskyblue"
          type="button"
          onClick={(e) => handleLogin(e, "user1@user.io", "password2")}
        >
          Demo 1
        </button>
        <button
          className="ltcoral"
          type="button"
          onClick={(e) => handleLogin(e, "user2@user.io", "password3")}
        >Demo 2
        </button>
      </form>
    </div>
  );
}

export default LoginFormModal;
