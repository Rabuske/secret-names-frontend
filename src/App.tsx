import React from 'react';
import './App.css';
import { SecretNames } from './components/SecretNames';
import { compose } from 'redux';
import { withTheme } from './decorators/WithTheme';
import { withRedux } from './decorators/WithRedux';
import { store } from './store'

const App: React.FC = () => {
  return(
    <SecretNames/>
  );
}

export default compose(withTheme, withRedux(store))(App);
