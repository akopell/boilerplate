import React, { Component } from 'react';

import { connect } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  // withRouter,
} from 'react-router-dom';
import { fetchMe } from '../store';
import Login from './Login';
import UserPage from './UserPage';
import LocalSignUpForm from './LocalSignUpForm';

// We've taken a class component and will wrapp it in
// `withRouter` so that it receives `history` from react-router-dom
// as a prop! We've kept it a class component because (as we'll see
// in the workshop), we want to take advantage of that `componentDidMount`
// lifecycle hook!
const Routes = class extends Component {
  componentDidMount() {
    this.props.fetchMe();
  }

  render() {
    if (this.props.userCurrentlyBeingFetched) {
      return <h1>Loading...</h1>;
    }
    return (
      <Router>
        <Switch>
          <Route path='/home' component={UserPage} />
          <Route path='/signup' component={LocalSignUpForm} />
          <Route path='/' component={Login} />
        </Switch>
      </Router>
    );
  }
};

const mapStateToProps = (state) => ({
  userCurrentlyBeingFetched: state.user.isFetching,
});

const mapDispatchToProps = (dispatch) => ({
  fetchMe: () => dispatch(fetchMe()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Routes);
