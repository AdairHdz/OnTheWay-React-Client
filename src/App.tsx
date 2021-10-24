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
import ServiceProviderHomePage from "./pages/service-providers/ServiceProviderHomePage";
import ServiceRequestDetailsPage from "./pages/service-requesters/ServiceRequestDetailsPage";
import ServiceRequesterHomePage from "./pages/service-requesters/ServiceRequesterHomePage";
import {AuthContext} from "./store/AuthContext";

function App() {
  const authContext = useContext(AuthContext)

  const renderHomePage = () => {    
    if(authContext.data.userType === UserType.SERVICE_PROVIDER) {
      return <ServiceProviderHomePage />
    }

    if(authContext.data.userType === UserType.SERVICE_REQUESTER) {
      return <ServiceRequesterHomePage />
    }
    return null
  }

  return (
    <div className="App">
      <Router>
        <Switch>                    
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
          <Route path="/service-requesters/:requesterId/service-requests/:requestId">
            <MainTabLayout>
              <ServiceRequestDetailsPage />
            </MainTabLayout>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
