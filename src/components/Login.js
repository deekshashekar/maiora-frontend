import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!email || !password) {
      alert("Please fill all the details");
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "http://localhost:3844/login",
        { email, password },
        config
      );
      const token = data.token;
      localStorage.setItem("token", token);
      config.headers.Authorization = `Bearer ${token}`;
      alert("Login successfull");
      // localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      history.push("/home");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <h1>Welcome</h1>
        <h5>Please login to your account</h5>
        <label>Email address</label>
        <br />
        <input
          type="text"
          value={email}
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label>Password</label>
        <br />
        <input
          type="password"
          value={password}
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <input type="submit" value="OK" />
      </form>
    </div>
  );
};

export default Login;
