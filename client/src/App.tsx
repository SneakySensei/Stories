import React, { useEffect, useState } from "react";
import { Switch, Route } from "react-router-dom";

import "./App.css";
import "./tailwind.css";
import Index from "./pages/Index";
import Seeker from "./pages/Seeker";
import Supporter from "./pages/Supporter";

const App = () => {
  const [isAuth, setIsAuth] = useState<boolean>(false);

  useEffect(() => {
    let token = sessionStorage.getItem("token");
    token && setIsAuth(true);
  }, []);

  let routes = (
    <Switch>
      <Route path="/" exact component={Index} />
    </Switch>
  );

  let authRoutes = (
    <Switch>
      <Route path="/supporter" exact component={Supporter} />
      <Route path="/seeker" exact component={Seeker} />
      <Route path="/" exact component={Index} />
    </Switch>
  );

  return !isAuth ? routes : authRoutes;
};

export default App;
