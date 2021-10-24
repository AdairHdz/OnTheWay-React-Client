import { useContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,  
} from "react-router-dom";
import './App.css';
import MainTabLayout from "./components/generics/MainTabLayout";
import UserType from "./enums/user-type";
import LoginPage from "./pages/LoginPage";
import RegistryPage from "./pages/RegistryPage";
import HomePage from "./pages/service-providers/Home";
import {AuthContext} from "./store/AuthContext";

function App() {
  const authContext = useContext(AuthContext)

  const renderHomePage = () => {    
    if(authContext.data.userType === UserType.SERVICE_PROVIDER) {
      return <HomePage />
    }

    if(authContext.data.userType === UserType.SERVICE_REQUESTER) {
      return <p>Requester</p>
    }
    return null
  }

  return (
    <div className="App">
      <Router>
        <Switch>          
          <Route path="/service-providers/:providerId" exact>
            <MainTabLayout>
              <HomePage />
            </MainTabLayout>            
          </Route>
          <Route path="/" exact>
            <MainTabLayout>
              {renderHomePage()}
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
