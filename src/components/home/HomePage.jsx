import React from "react";
import { Container, makeStyles, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  paper: {
    textAlign: "center",
    color: theme.palette.text.secondary,
    backgroundColor: "#e1dbcc",
    borderRadius: 16,
    position: "relative",
  },
  imageLink: {
    width: "100%",
    maxWidth: "100%",
    borderRadius: 4,
  },
  textOverlay: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    color: "white",
    fontSize: "2.5rem",
    fontWeight: "bold",
  },
}));

function Home() {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="lg">
      <div className={classes.root}>
        <Paper className={classes.paper}>
          <a href="/quanlykhohang">
            <div style={{ position: "relative" }}>
              <img
                className={classes.imageLink}
                src="https://img.freepik.com/photos-gratuite/porte-acier-dans-entrepot_53876-74720.jpg?w=1060&t=st=1697810783~exp=1697811383~hmac=32c4d1242452d84800caae7848f544428c059cca1a4b4c4548eecd18de1733aa"
                alt="quanlykhohang"
              />
              <div className={classes.textOverlay} style={{Color: "black" }}>Quản lý Kho Hàng</div>
            </div>
          </a>
        </Paper>
      </div>
    </Container>
  );
}

export default Home;
