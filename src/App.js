import React, { Component } from 'react';
import { connect } from 'react-redux'
import Header from './components/UI/Layout/Header'
import './App.css';
import { Switch, Route } from 'react-router-dom'
import Well from './containers/Well/Well'
import Show from './components/UI/Pages/Show/Show'
import GoogleLogin from './components/UI/Form/Login/GoogleLogin'
import * as actions from './store/actions/index'
import Public from './components/UI/Pages/Public/Public'

class App extends Component {
  componentDidMount() {
    this.props.onCheckAuthState()
  }
  render() {
    let routes = ''

    if (this.props.auth[1] && this.props.auth[1].user && this.props.auth[1].user !== null) {
      routes = (
        <Switch>
          <Route exact path="/" component={Well} />
          <Route path='/logout' component={GoogleLogin} />
          <Route path='/recipes/:id' component={Show} />
        </Switch>
      )
    } else {
      routes = (
        <Switch>
          <Route path='/login' component={GoogleLogin} />
          <Route path='/public' component={Public} />
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
    auth: state.auth
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onCheckAuthState: () => dispatch(actions.checkAuthState())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
