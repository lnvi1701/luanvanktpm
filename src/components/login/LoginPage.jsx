import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import React from "react";
import "./loginPage.scss";

function LoginPage(props) {
  return (
    <div className="loginPage">
      <form className="form" noValidate autoComplete="off">
        <TextField id="outlined-basic" label="user" variant="outlined" />
        <TextField
          id="standard-password-input"
          label="Password"
          type="password"
          variant="outlined"
          autoComplete="current-password"
        />
        <Button variant="contained" color="primary">
          Login
        </Button>
      </form>
    </div>
  );
}

export default LoginPage;
