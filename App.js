import React, { Component } from 'react';
import Form from './Form';
import thunkMiddleware from 'redux-thunk';
import { connect, Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';

import { reducer } from './reducer';
import { fetchPeople, savePeople } from './actions';

function mapStateToProps(state) {
  return {
    isLoading: state.isLoading,
    fields: state.person,
    people: state.people,
    saveStatus: state.saveStatus,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    onSubmit: people => {
      dispatch(savePeople(people));
    }
  };
}
const ReduxForm = connect(mapStateToProps, mapDispatchToProps)(Form)

const store = createStore(reducer, applyMiddleware(thunkMiddleware));

class App extends Component {
  componentDidMount() {
    store.dispatch(fetchPeople());
  }
  render() {
    return (
      <Provider store={store}>
        <ReduxForm />
      </Provider>
    );
  }
}

export default App;