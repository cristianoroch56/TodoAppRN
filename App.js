import React, { Component } from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { Provider } from 'mobx-react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Provider>
        <AppNavigator />
      </Provider>
    );
  }
}
export default App;
