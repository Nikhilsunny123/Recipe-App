import React, { useState } from "react";
import Form from "./Form";
import axios from "axios";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useNavigate();
  const [_, setCookies] = useCookies(["access_token"]);
  const onsubmit = async (e) => {
    e.preventDefault();

    try {
      await axios
        .post("http://localhost:3001/auth/login", {
          username,
          password,
        })
        .then((res) => {
          const resData = res.data;
          setCookies("access_token", resData.token);
          window.localStorage.setItem("userID", resData.userID);
          resData && router("/");
        });
      await alert("Login success");
    } catch (err) {
      console.log("error happend");
    }
  };
  return (
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      onsubmit={onsubmit}
      label="Login"
    />
  );
};

export default Login;
