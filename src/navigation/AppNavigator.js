/* eslint-disable prettier/prettier */
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { AddSubTodoListScreen, HomeScreen, TodoListScreen } from '../screens';

export default createAppContainer(
  createStackNavigator(
    {
      HomeScreen: {
        screen: HomeScreen,
        navigationOptions: ({ navigation }) => ({ header: null }),
      },
      TodoListScreen: {
        screen: TodoListScreen,
        navigationOptions: ({ navigation }) => ({ header: null }),
      },
      AddSubTodoListScreen: {
        screen: AddSubTodoListScreen,
        navigationOptions: ({ navigation }) => ({ header: null }),
      },
    },
    {
      initialRouteName: 'HomeScreen',
      defaultNavigationOptions: {
        gestureEnabled: false,
      },
    }
  )
);
