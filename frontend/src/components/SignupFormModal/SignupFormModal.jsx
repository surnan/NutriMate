//frontend/src/componenets/SignupFormModal/SignupFormModal.jsx
import "./SignupForm.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
    }

    const serverResponse = await dispatch(
      thunkSignup({
        email,
        username,
        password,
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
      <form className="signup_hGrid" onSubmit={handleSubmit}>
        <h1 className="center">Sign Up</h1>
        <label>
          Email
          <input
            className="_input"
            type="text"
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
            required
          />
        </label>
        {errors.email && <p>{errors.email}</p>}
        <label>
          Username
          <input
            className="_input"
            type="text"
            value={username}
            name="username"
            onChange={(e) => setUsername(e.target.value)}
            autoComplete="off"
            required
          />
        </label>
        {errors.username && <p>{errors.username}</p>}
        <label>
          Password
          <input
            className="_input"
            type="password"
            value={password}
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        <label>
          Confirm <br />Password
          <input
            className="_input"
            type="password"
            value={confirmPassword}
            name="confirmpassword"
            onChange={(e) => setConfirmPassword(e.target.value)}
            autoComplete="off"
            required
          />
        </label>
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        <button className="orange _button" type="submit">Sign Up</button>
      </form>
    </>
  );
}

export default SignupFormModal;
