import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import LoadingBar from 'react-redux-loading';
import getRoutes from './routes';
import { GetInitialData } from './store/actions/shared';
import NavBar from './components/NavBar';
import './App.css';
class App extends Component {

  componentDidMount() {
    this.props.GetInitialData();
  }

  render() {
    const { authedUser } = this.props;

    return (
      <Fragment>
        <LoadingBar active={authedUser !== null} />
        <div className="App">
          {authedUser !== null &&
            <NavBar />}
          
          {getRoutes(authedUser)}
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = ({ authedUser }) => (
  {
    authedUser,
    loading: authedUser === null
  });

export default connect(mapStateToProps, { GetInitialData })(App);
