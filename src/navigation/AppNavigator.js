/* eslint-disable prettier/prettier */
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import {
  HomeScreen,
  TodoListScreen,
  AddTodoListScreen,
  AddSubTodoListScreen,
} from '../screens';

export default createAppContainer(
  createStackNavigator(
    {
      HomeScreen: {
        screen: HomeScreen,
        //navigationOptions: ({navigation}) => ({header: false}),
        navigationOptions: {
          headerShown: false,
        },
      },
      TodoListScreen: {
        screen: TodoListScreen,
        navigationOptions: {
          headerShown: false,
        },
      },
      AddTodoListScreen: {
        screen: AddTodoListScreen,
        navigationOptions: {
          headerShown: false,
        },
      },
      AddSubTodoListScreen: {
        screen: AddSubTodoListScreen,
        navigationOptions: {
          headerShown: false,
        },
      },
    },
    {
      initialRouteName: 'HomeScreen',
      defaultNavigationOptions: {
        gestureEnabled: false,
      },
    },
  ),
);
