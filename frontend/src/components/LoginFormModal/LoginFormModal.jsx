import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
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
    <div className="login_modal_popup">
      <form className="login_hGrid popupDiv" onSubmit={handleSubmit}>
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
        {errors.email && <p>{errors.email}</p>}
        <label>
          Password:&nbsp;&nbsp;
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        <button className="mySubmitBtn orange" type="submit">Log In</button>
        <button className="mySubmitBtn ltskyblue" type="submit">Demo 1</button>
        <button className="mySubmitBtn ltcoral" type="submit">Demo 2</button>
      </form>
    </div>
  );
}

export default LoginFormModal;
