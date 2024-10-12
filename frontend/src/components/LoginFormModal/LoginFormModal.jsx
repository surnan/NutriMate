import "./LoginFormModal.css";
import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  // Modified handleLogin to use proper server response handling
  const handleLogin = async (e, loginEmail, loginPassword) => {
    e.preventDefault();

    const credentials = {
      email: loginEmail || email, // Demo email or the entered email
      password: loginPassword || password, // Demo password or the entered password
    };

    const serverResponse = await dispatch(thunkLogin(credentials));

    if (serverResponse?.errors) {
      // If server responds with errors, set them to display in the UI
      setErrors(serverResponse);
    } else {
      // Close modal on successful login
      closeModal();
    }
  };
  

  return (
    <>
      {/* Show server errors */}
      {errors.server && <p className="error-message">{errors.server}</p>}
      <form className="login_hGrid modal_css" onSubmit={(e) => handleLogin(e)}>
        <h1 className="center">Log In</h1>
        
        {/* Email input */}
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

        {/* Password input */}
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

        {/* Log In button */}
        <button className="orange" type="submit">
          Log In
        </button>

        {/* Demo user buttons */}
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
        >
          Demo 2
        </button>
      </form>
    </>
  );
}

export default LoginFormModal;
