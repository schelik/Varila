import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import SignUp  from './components/SignUp';
import SignIn from './components/Login';
import Doc from './components/Doc';
import NotFound from './components/NotFound';
import { useSelector } from "react-redux";


function App() {
  let key = useSelector((state) => state.auth.authKey);
  if(key === ""){
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={SignUp} />
          <Route exact path="/login" component={SignIn} />
          <Route path="*" component={NotFound}/>
        </Switch>
      </Router>
    )
  }
  else{
    return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to={'/doc/1'} />
          </Route>
          <Route exact path="/doc/:id" component={Doc} />
          <Route component={NotFound}/>
        </Switch>
      </Router>
    )
  }
}

export default App;
