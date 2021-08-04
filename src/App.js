import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.scss";
import DashBoard from "./pages/DashBoard";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  return (
    <div className="app">
      <Router>
        <div>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/dashboard">
              <DashBoard />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
