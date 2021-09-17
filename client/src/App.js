import './App.css';
import { Switch, Route } from 'react-router-dom';
import Login from './Components/Auth/Login';
import Signup from './Components/Auth/Signup';
import Dashboard from './Components/Dashboard/Dashboard';

function App() {
  return (
    <div>
      <Switch>
        <Route path='/' exact component={Login} />
        <Route path='/signup' component={Signup} />
        <Route path='/dashboard' component={Dashboard} />
      </Switch>
    </div>
  );
}

export default App;
