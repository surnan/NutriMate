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
    <>
      {errors.server && <p>{errors.server}</p>}
      <form className="login_hGrid" onSubmit={(e) => handleLogin(e)}>
        <h1>Log In</h1>
        <label>
          Email&nbsp;&nbsp;
          <input
            type="text"
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        <label>
          Password&nbsp;&nbsp;
          <input
            type="password"
            value={password}
            name="password"
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
    </>
  );
}

export default LoginFormModal;
