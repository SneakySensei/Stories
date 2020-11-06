import React from "react";
import { Switch, Route } from "react-router-dom";

import "./App.css";
import "./tailwind.css";
import Index from "./pages/Index";

function App() {
  return (
    <Switch>
      <Route path="/" exact component={Index} />
    </Switch>
  );
}

export default App;
