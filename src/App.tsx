
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Work from "./pages/Work";
import Process from "./pages/Process";

import './App.css'


function App() {

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/work" component={Work} />
        <Route path="/process" component={Process} />
      </Switch>
    </Router>
  );
     
}

export default App
