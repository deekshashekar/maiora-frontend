import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const Register = () => {
  const [show, setShow] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  const submitHandler = async (e) => {
    e.preventDefault();

    setLoading(true);
    if (!name || !email || !password) {
      alert("Please fill all the details");
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "http://localhost:3844/register",
        { name, email, password },
        config
      );
      alert("Registration successfull");
      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      history.push("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <form onSubmit={submitHandler}>
        <h1>Register with us</h1>
        <h5>Please register to continue</h5>
        <label>Name</label>
        <br />
        <input
          type="text"
          placeholder="name"
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <label>Email address</label>
        <br />
        <input
          type="text"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label>Password</label>
        <br />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />

        <input type="submit" value="Sign up" />
      </form>
    </div>
  );
};

export default Register;
