import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import { makeStyles } from "@material-ui/core/styles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import React from "react";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    cursor: "pointer",
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const history = useHistory();

  const onLoginBtnClick = () => {
    history.push("/login");
  };

  const onLogoClick = () => {
    history.push("/");
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar style={{ backgroundColor: '#e1dbcc' }}>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
            style={{ color: "#000000" }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            className={classes.title}
            onClick={onLogoClick}
            style={{ color: "#000000" }}
          >
            INVENTORY-NV
          </Typography>
          <Button onClick={onLoginBtnClick}>
            <span style={{ color: "#000000" }}>ĐĂNG NHẬP</span>
          </Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
