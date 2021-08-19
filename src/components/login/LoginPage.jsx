import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import TextField from "@material-ui/core/TextField";

import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { adminLogin } from "../../api/stock-manager";
import { setAuth } from "../../redux/auth/auth.actions";

import "./loginPage.scss";

function LoginPage({ setAuth }) {
  // library
  const history = useHistory();

  // model
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ui state
  const [apiLoading, setApiLoading] = useState(false);
  const [err, setErr] = useState("");

  // options state
  const [isAdmin, setIsAdmin] = useState(false);

  const onEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const onPasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleLoginSuccess = async (res) => {
    await setAuth(res);
    await history.push("/dashboard");
  };

  const onSubmit = () => {
    setApiLoading(true);
    setErr(null);
    adminLogin(email, password, isAdmin)
      .then((res) => {
        if (res.error) throw res.error;
        handleLoginSuccess(res);
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

        <FormControlLabel
          control={
            <Switch
              color="primary"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            />
          }
          label="Đăng nhập với tư cách admin"
        />

        {error}
        <Button variant="contained" color="primary" onClick={onSubmit}>
          {contentBtn}
        </Button>
      </form>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.auth.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setAuth: (user) => dispatch(setAuth(user)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
