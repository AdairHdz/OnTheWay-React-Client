import {
  BrowserRouter as Router,
  Switch,
  Route,  
} from "react-router-dom";
import './App.css';
import LoginPage from "./pages/LoginPage";
import RegistryPage from "./pages/RegistryPage";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact>
            <p className="text-red-500">Hello world</p>    
          </Route>
          <Route path="/login">
            <LoginPage />
          </Route>
          <Route path="/registry">
            <RegistryPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
