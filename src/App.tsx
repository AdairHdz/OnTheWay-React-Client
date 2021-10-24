import {
  BrowserRouter as Router,
  Switch,
  Route,  
} from "react-router-dom";
import './App.css';
import MainTabLayout from "./components/generics/MainTabLayout";
import LoginPage from "./pages/LoginPage";
import RegistryPage from "./pages/RegistryPage";
import HomePage from "./pages/service-providers/Home";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>          
          <Route path="/service-providers/:providerId" exact>
            <MainTabLayout>
              <HomePage />
            </MainTabLayout>            
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
