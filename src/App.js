import React, { Component } from 'react';
import { connect } from 'react-redux'
import Header from './components/UI/Layout/Header'
import './App.css';
import { Switch, Route } from 'react-router-dom'
import Well from './containers/Well/Well'
import Show from './components/UI/Pages/Show/Show'
import Login from './components/UI/Pages/Login/Login'
import Logout from './components/UI/Form/Login/Logout'
import * as actions from './store/actions/index'

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup()
  }
  
  render() {

    let routes = '';

    if (!this.props.isAuth) {
      routes = (
        <Switch>
          <Route path='/login' component={Login} />
          <Route exact path="/" component={Well} />
          <Route path='/recipes/:id' component={Show} />
        </Switch>
      )
    } else {
      routes = (
        <Switch>
          <Route exact path="/" component={Well} />
          <Route path='/login' component={Login} />
          <Route path='/logout' component={Logout} />
          <Route path='/recipes/:id' component={Show} />
        </Switch>
      )
    }
    
    return (
      <div className="App">
        <Header />
        {routes}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.userId !== null,
    userId: state.auth.userId
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(App);
