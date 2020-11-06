import React from "react";
import { Switch, Route } from "react-router-dom";

import "./App.css";
import "./tailwind.css";
import Index from "./pages/Index";
import Seeker from "./pages/Seeker";

function App() {
  return (
    <Switch>
      <Route path="/seeker" exact component={Seeker} />
      <Route path="/" exact component={Index} />
    </Switch>
  );
}

export default App;
