import React, { Component } from 'react';
import {
  View,
  Text,
  RefreshControl,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  Icon,
} from 'react-native';
import Snackbar from 'react-native-snackbar';
import Colors from '../constants/Colors';
import { StylesHomeScreen } from '../stylesheets';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { MyToolbar } from '../components';
import store from '../database/TodoListStore';
import { observer } from 'mobx-react';
import {
  deleteTodoList,
  queryAllTodoLists,
} from '../database/TodoListLocalStore';
import {
  TouchableHighlight,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';

@observer
class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      refreshing: false,
      isLoading: false,
      text: '',
      showInput: false,
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
      //this.startAnimationMove();
    });
  }

  _onRefresh = () => {
    this.setState({ refreshing: true });
    // setup function call to get todo lists
    setTimeout(() => {
      this.setState({ refreshing: false });
    }, 800);
  };

  // Loader, Toast, Snackbar Handling section
  setLoaderState(loaderState) {
    this.setState({
      isLoading: loaderState,
    });
  }

  removeListItem(item) {
    deleteTodoList(item)
      .then(() => {
        store.removeListItem(item);
      })
      .catch((error) => {
        console.log(`deleteTodoList error ${error}`);
      });
  }

  async redirectToTodoScreen(item) {
    await store.setCategoryName(item);
    this.props.navigation.navigate('TodoListScreen', { item });
  }

  render() {
    const { isLoading } = this.state;
    return (
      <View style={StylesHomeScreen.container}>
        <StatusBar
          hidden={false}
          backgroundColor={'transparent'}
          translucent
          barStyle='dark-content'
        />
        <MyToolbar titleName={'Todo List'} />
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
        >
          {store.getTodoList.length > 0 ? (
            <View style={StylesHomeScreen.viewRvStyle}>
              {store.getTodoList.map((item, i) => {
                return (
                  <View key={i} style={StylesHomeScreen.itemContainer}>
                    <Text
                      style={StylesHomeScreen.item}
                      onPress={() => this.redirectToTodoScreen(item.name)}
                    >
                      {item.name.toUpperCase()}
                    </Text>
                    <Text
                      style={StylesHomeScreen.deleteItem}
                      onPress={() => this.removeListItem(item.name)}
                    >
                      Remove
                    </Text>
                  </View>
                );
              })}
            </View>
          ) : (
            <View style={StylesHomeScreen.noDataStyle}>
              <Text style={StylesHomeScreen.noDataAvailable}>
                {'No Todo List Available'}
              </Text>
            </View>
          )}
        </ScrollView>
        <TouchableOpacity
          style={StylesHomeScreen.fabStyle}
          onPress={() => this.props.navigation.navigate('AddTodoListScreen')}
        >
          <Text style={StylesHomeScreen.fabStyleText}>+</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
export { HomeScreen };
