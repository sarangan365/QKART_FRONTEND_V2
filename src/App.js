import Register from "./components/Register";
import ipConfig from "./ipConfig.json";
import { Route, Switch, BrowserRouter } from "react-router-dom";
import Login from "./components/Login";
import Products from "./components/Products";

export const config = {
  endpoint: `http://${ipConfig.workspaceIp}:8082/api/v1`,
};

export default function App() {
  return (
    <div className="App">
      {/* TODO: CRIO_TASK_MODULE_LOGIN - To add configure routes and their mapping */}
      <BrowserRouter>
        <Switch>
          <Route path="/register">
            <Register />
          </Route>   
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <Products />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  );
}
