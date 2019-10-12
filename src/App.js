import React from 'react';
import Header from './components/UI/Layout/Header'
import './App.css';
import { Switch, Route } from 'react-router-dom'
import Well from './containers/Well/Well'
import Show from './components/UI/Pages/Show/Show'

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={Well} />
        <Route path='/recipes/:id' component={Show} />
      </Switch>
    </div>
  );
}

export default App;
