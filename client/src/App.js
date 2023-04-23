import './App.css';
import {Switch, Route, useLocation} from "react-router-dom";
import {Landing, Home, Nav, Create, Detail} from "./components/index";

function App() {
  //Hooks
  const location= useLocation();

  return (
    <div className="App">
      {location.pathname!=="/"?<Nav/>:null}
      <Switch>
        <Route exact path="/">
            <Landing/>
        </Route>
        <Route path="/home">
          <Home/>
        </Route>
        <Route path="/create">
          <Create/>
        </Route>
        <Route path="/Detail/:id">
          <Detail/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
