import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "./login.css";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = () => {
    if ((username === password) & (username != "")) {
      const userData = { username };

      login(userData);
      navigate("/dashboard");
    } else {
      alert("Invalid credentials. Usename and password must be same.");
    }
  };

  return (
    <div>
      <div className="admin_login_form_div">
        <form className="admin_login_form">
          <div className="empty_div"></div>
          <h1 className="admin_login_form_title">Welcome BTI Admin</h1>
          <div className="w-full flex flex-column gap-3">
            <label htmlFor="user_name_or_email" className="lbl mt-3">
              User Name <span className="lblimp">*</span>
            </label>
            <InputText
              id="user_name_or_email"
              name="user_name_or_email"
              aria-describedby="username-help"
              className="h-4rem"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="w-full flex flex-column gap-3">
            <label htmlFor="password" className="lbl mt-3">
              Password <span className="lblimp">*</span>
            </label>
            <InputText
              type="password"
              id="password"
              name="password"
              aria-describedby="password-help"
              className="h-4rem"
              placeholder="********************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <Button
            className="dgsigninbtn w-full mt-3 flex text-center justify-content-center"
            onClick={handleLogin}
          >
            Sign in
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
