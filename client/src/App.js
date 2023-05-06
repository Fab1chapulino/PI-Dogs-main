import styles from "./css/App.module.css";
import {Switch, Route, useHistory, useLocation} from "react-router-dom";
import {Landing, Home, Nav, Create, Detail, Search} from "./components/index";
import {useSelector} from "react-redux";
import axios from "axios"
axios.defaults.baseURL = "https://pi-dogs-main-production-24db.up.railway.app/";


function App() {
  //Hooks
  const history = useHistory();
  const location = useLocation();
  const {error, message} = useSelector(s=>s);


  return (
    <div className="App">
      {error.status===500? <p id={styles.errorConnection}>{error.message}</p>:null}


      {message.status===200? <p id={styles.success}>
        {message.content} 
        <span onClick={()=> document.getElementById(styles.success).style.display="none"}>X</span></p>:null}
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
        <Route path="/detail/:id">
          <Detail/>
        </Route>
        <Route path="/search/:query">
          <Search/>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
