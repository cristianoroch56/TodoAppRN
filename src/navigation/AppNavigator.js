/* eslint-disable prettier/prettier */
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { HomeScreen } from '../screens';

export default createAppContainer(
  createStackNavigator(
    {
      HomeScreen: {
        screen: HomeScreen,
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
