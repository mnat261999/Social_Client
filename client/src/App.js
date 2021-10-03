import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import { useSelector } from 'react-redux'
import Login from './pages/Login';
import Home from './pages/Home';
import Arlet from './components/arlet/Arlet';

function App() {
  const {auth} = useSelector(state => state)
  return (
    <Router>
      <Arlet/>
      <input type="checkbox" id="theme" />
      <div className='App'>
        <div className="main">
          <Route exact path="/" component={auth.token ? Home : Login} />
        </div>
      </div>
    </Router>
  );
}

export default App;
