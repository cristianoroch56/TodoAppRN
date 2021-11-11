import React, { Component } from 'react';
import AppNavigator from './src/navigation/AppNavigator';
import { Provider } from 'mobx-react';
import {
  queryAllSubTodoLists,
  queryAllTodoLists,
} from './src/database/TodoListLocalStore';
import store from './src/database/TodoListStore';
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    if (store.getFilterSubTodoList('').length == 0)
      queryAllSubTodoLists()
        .then(async (res) => {
          for (let index = 0; index < res.length; index++) {
            const element = res[index];
            await store.addSubListItem(element.categoryName, element.name);
          }
        })
        .catch((error) => {
          console.log(`queryAllSubTodoLists error ${error}`);
        });
    if (store.getTodoList.length == 0)
      queryAllTodoLists()
        .then(async (res) => {
          for (let index = 0; index < res.length; index++) {
            const element = res[index];
            await store.addItem(element.name);
          }
        })
        .catch((error) => {
          console.log(`queryAllTodoLists error ${error}`);
        });
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
