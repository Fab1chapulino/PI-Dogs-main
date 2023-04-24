import './App.css';
import {Switch, Route, useLocation} from "react-router-dom";
import {Landing, Home, Nav, Create, Detail, Search} from "./components/index";

function App() {
  //Hooks
  const location= useLocation();
  //const history = useHistory();
  //console.log(history)

  return (
    <div className="App">
      {location.pathname!=="/"?<Nav/>:null}
      <Switch>
        <Route exact path="/">
            <Landing/>
        </Route>
        <Route path="/home/:page">
          <Home/>
        </Route>
        <Route path="/create">
          <Create/>
        </Route>
        <Route path="/Detail/:id">
          <Detail/>
        </Route>
        <Route path="/search">
          <Search/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
