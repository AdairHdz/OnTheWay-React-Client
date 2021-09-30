import {
  BrowserRouter as Router,
  Switch,
  Route,  
} from "react-router-dom";
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact>
            <p className="text-red-500">Hello world</p>    
          </Route>
          <Route path="/home">
            <p className="text-blue-500">Home</p>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
