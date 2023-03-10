import React, { useState } from "react";
import Form from "./Form";
import axios from "axios";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onsubmit = async (e) => {
    e.preventDefault();
    await console.log(username, password);
    try {
      await axios
        .post("http://localhost:3001/auth/register", {
          username,
          password,
        })
        .then((res) => {
          console.log(res);
        });
      await alert("registered");
    } catch (err) {
      console.log("error happend");
    }

    await setUsername("");
    await setPassword("");
  };
  return (
    <Form
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      onsubmit={onsubmit}
      label="Register"
    />
  );
};

export default Register;
