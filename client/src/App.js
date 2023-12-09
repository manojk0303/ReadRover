import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';

const App = () => {
  return (
    <Router>
      <Switch>

        <Route path="/" component={Home} />
        <Route path="/login" component={Login} />
        {/* Add other routes as needed */}
      </Switch>
    </Router>
  );
};

export default App;
