import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import TextField from "@material-ui/core/TextField";
import React, { useState } from "react";
import { adminLogin } from "../../api/stock-manager";
import "./loginPage.scss";

function LoginPage(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [apiLoading, setApiLoading] = useState(false);
  const [err, setErr] = useState("");

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const onSubmit = () => {
    setApiLoading(true);
    adminLogin(email, password)
      .then((res) => {
        if (res.error) throw res.error;
        console.log(res);
      })
      .catch((err) => {
        setErr(err.message);
      })
      .finally(() => {
        setApiLoading(false);
      });
  };

  const contentBtn = apiLoading ? (
    <CircularProgress color="secondary" />
  ) : (
    "Login"
  );

  const error = err ? (
    <p style={{ textAlign: "center", color: "red" }}>{err}</p>
  ) : null;

  return (
    <div className="loginPage">
      <form className="form" noValidate autoComplete="off">
        <TextField
          id="outlined-basic"
          label="user"
          variant="outlined"
          value={email}
          onChange={onEmailChange}
        />
        <TextField
          id="standard-password-input"
          label="Password"
          type="password"
          variant="outlined"
          autoComplete="current-password"
          value={password}
          onChange={onPasswordChange}
        />
        {error}
        <Button variant="contained" color="primary" onClick={onSubmit}>
          {contentBtn}
        </Button>
      </form>
    </div>
  );
}

export default LoginPage;
