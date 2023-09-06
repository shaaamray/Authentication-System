import { Box, TextField, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

const Signup = () => {
  const history = useNavigate();
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) =>{
    setInput((prev) => ({
      ...prev,
      //key:value
      [e.target.name] : e.target.value,
    }));
    console.log(e.target.name, "value", e.target.value);
  };

  const sendRequest = async() => {
    const res = await axios.post("http://localhost:5010/api/signup", {
      name: input.name,
      email: input.email,
      password: input.password
    }).catch((err) => console.log(err));
    const data = await res.data;
    return data;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    sendRequest().then(() => history("/login"));
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        width={300}
        display={"flex"}
        flexDirection={"column"}
        justifyContent={"center"}
        alignItems={"center"}
        marginLeft={"auto"}
        marginRight={"auto"}
      >
        <Typography variant="h4">Create Account</Typography>
        <TextField
          name="name"
          value={input.name}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          placeholder="Name"
        />
        <TextField
          name="email"
          value={input.email}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          placeholder="Email"
          type={"email"}
        />
        <TextField
          name="password"
          value={input.password}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          placeholder="Password"
          type="password"
        />
        <Button type="submit" variant="contained">
          SignUp
        </Button>
      </Box>
    </form>
  );
};

export default Signup;
