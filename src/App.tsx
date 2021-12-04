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
import ServicesPage from "./pages/service-providers/ServicesPage";
import NewServiceRequestPage from "./pages/service-requesters/NewServiceRequestPage";
import ServiceProviderDetailsPage from "./pages/service-requesters/ServiceProviderDetailsPage";
import ServiceProvidersSearchPage from "./pages/service-requesters/ServiceProvidersSearchPage";
import ServiceRequestDetailsPage from "./pages/service-requesters/ServiceRequesterRequestDetailsPage";
import ServiceRequesterHomePage from "./pages/service-requesters/ServiceRequesterHomePage";
import { AuthContext } from "./store/AuthContext";
import ServiceProviderRequestDetailsPage from "./pages/service-providers/ServiceProviderRequestDetailsPage";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import LoginRoute from "./components/routes/LoginRoute";
import AccountVerificationPage from "./pages/AccountVerificationPage";
import StatisticsPage from "./pages/service-providers/StatisticsPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  const authContext = useContext(AuthContext)

  const renderHomePage = () => {
    if (authContext.data.userType === UserType.SERVICE_PROVIDER) {
      return <ServiceProviderHomePage />
    }

    if (authContext.data.userType === UserType.SERVICE_REQUESTER) {
      return <ServiceRequesterHomePage />
    }
    return null
  }

  return (
    <div className="App">
      <Router>
        <Switch>
          <ProtectedRoute path="/" exact>
            <MainTabLayout>
              {renderHomePage()}
            </MainTabLayout>
          </ProtectedRoute>
          <LoginRoute path="/login">
            <LoginPage />
          </LoginRoute>
          <LoginRoute path="/registry">
            <RegistryPage />
          </LoginRoute>
          <ProtectedRoute userType={UserType.SERVICE_REQUESTER} path="/service-requesters/:requesterId/service-requests/:requestId">
            <MainTabLayout>
              <ServiceRequestDetailsPage />
            </MainTabLayout>
          </ProtectedRoute>
          <ProtectedRoute userType={UserType.SERVICE_REQUESTER} path="/providers" exact>
            <MainTabLayout>
              <ServiceProvidersSearchPage />
            </MainTabLayout>
          </ProtectedRoute>
          <ProtectedRoute userType={UserType.SERVICE_REQUESTER} path="/service-providers/:providerId" exact>
            <MainTabLayout>
              <ServiceProviderDetailsPage />
            </MainTabLayout>
          </ProtectedRoute>
          <ProtectedRoute userType={UserType.SERVICE_REQUESTER} path="/service-providers/:providerId/service-request">
            <MainTabLayout>
              <NewServiceRequestPage />
            </MainTabLayout>
          </ProtectedRoute>
          <ProtectedRoute userType={UserType.SERVICE_PROVIDER} path="/services">
            <MainTabLayout>
              <ServicesPage />
            </MainTabLayout>
          </ProtectedRoute>
          <ProtectedRoute userType={UserType.SERVICE_PROVIDER} path="/service-providers/:providerId/service-requests/:requestId">
            <MainTabLayout>
              <ServiceProviderRequestDetailsPage />
            </MainTabLayout>
          </ProtectedRoute>
          <Route path="/verify-account">
            <AccountVerificationPage />
          </Route>
          <ProtectedRoute userType={UserType.SERVICE_PROVIDER} path="/statistics">
            <MainTabLayout>
              <StatisticsPage />
            </MainTabLayout>
          </ProtectedRoute>
          <Route path="/*">
            <NotFoundPage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
