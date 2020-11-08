import React, { useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import "./App.css";
import "./tailwind.css";
import Index from "./pages/Index";
import Seeker from "./pages/Seeker";
import Supporter from "./pages/Supporter";
import NotFound from "./pages/NotFound";

const App = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false);

  useEffect(() => {
    let token = sessionStorage.getItem("token");
    token && setIsAuth(true);
  }, []);

  let routes = (
    <Switch>
      <Route path="/seeker" exact>
        <Redirect to="/" exact />
      </Route>
      <Route path="/supporter" exact>
        <Redirect to="/" exact />
      </Route>
      <Route path="/" exact component={Index} />
      <Route path="/*" exact component={NotFound} />
    </Switch>
  );

  let authRoutes = (
    <Switch>
      <Route path="/supporter" exact component={Supporter} />
      <Route path="/seeker" exact component={Seeker} />
      <Route path="/" exact component={Index} />
      <Route path="/*" exact component={NotFound} />
    </Switch>
  );

  return !isAuth ? routes : authRoutes;
};

export default App;
