import { useState } from "react";
import api from "../util/api";
import { useNavigate } from "react-router-dom";
import { useUserStore } from "../store/User";

const LoginPage = () => {
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const setUser = useUserStore((state) => state.setUser);

  const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setId(e.target.value);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = () => {
    const fetchLogin = async () => {
      const response = await api.post<{ userId: number; loginId: string }>(
        "/auth/login",
        {
          loginId: id,
          password: password,
        }
      );
      if (response.status === 200 && response.data) {
        setUser({
          userId: response.data.userId,
          userLoginId: response.data.loginId,
        });
        navigate("/events");
      }
    };
    fetchLogin();
  };

  return (
    <div className="page login-page">
      <h1 className="login-page__title">Login</h1>
      <form
        className="login-form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit();
        }}
      >
        <div className="login-form__row">
          <label htmlFor="id" className="login-form__label">
            ID
          </label>
          <input
            type="text"
            id="id"
            name="id"
            className="login-form__input"
            value={id}
            onChange={handleIdChange}
            autoComplete="username"
          />
        </div>
        <div className="login-form__row">
          <label htmlFor="password" className="login-form__label">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="login-form__input"
            value={password}
            onChange={handlePasswordChange}
            autoComplete="current-password"
          />
        </div>
        <button type="submit" className="login-form__submit">
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
