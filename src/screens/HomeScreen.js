import React, {Component} from 'react';
import {
  View,
  Text,
  RefreshControl,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
  SafeAreaView,
} from 'react-native';
import Snackbar from 'react-native-snackbar';
import Colors from '../constants/Colors';
import {StylesHomeScreen} from '../stylesheets';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {MyToolbar} from '../components';
import store from '../database/TodoListStore';
import {observer} from 'mobx-react';
import {
  deleteTodoList,
  queryAllTodoLists,
} from '../database/TodoListLocalStore';
import DraggableFlatList from 'react-native-draggable-dynamic-flatlist';
import {isEmpty} from '../constants/Utils';
@observer
class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      refreshing: false,
      isLoading: false,
      text: '',
      showInput: false,
      todoList: [],
    };
  }

  componentDidMount() {
    const {navigation} = this.props;
    this.setState({todoList: store.getTodoList});
    this.focusListener = navigation.addListener('didFocus', () => {
      this.setState({todoList: store.getTodoList});
      //this.startAnimationMove();
    });
  }

  _onRefresh = () => {
    this.setState({refreshing: true});
    // setup function call to get todo lists
    setTimeout(() => {
      this.setState({refreshing: false});
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
        const tempData = this.state.todoList.filter(list => list.name != item);

        this.setState({todoList: tempData});
        store.removeListItem(item);
      })
      .catch(error => {
        console.log(`deleteTodoList error ${error}`);
      });
  }

  async redirectToTodoScreen(item) {
    await store.setCategoryName(item);
    this.props.navigation.navigate('TodoListScreen', {item});
  }

  renderUpdateItem = ({item, i, move, moveEnd, isActive}) => {
    return (
      <TouchableOpacity
        style={StylesHomeScreen.itemContainer}
        onLongPress={move}
        onPressOut={moveEnd}>
        <Text style={StylesHomeScreen.item}>{item.name}</Text>
        <TouchableOpacity
          style={StylesHomeScreen.deleteItem}
          onPress={() => this.removeListItem(item.name)}>
          <Image
            source={require('../assets/icons/ic_delete.png')}
            style={{width: wp('6.5%'), height: wp('6.5%')}}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={StylesHomeScreen.deleteItem}
          onPress={() => this.redirectToTodoScreen(item.name)}>
          <Image
            source={require('../assets/icons/ic_next.png')}
            style={{width: wp('6.5%'), height: wp('6.5%')}}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  };

  updateTodoList(data) {
    this.setState({todoList: data});
  }

  render() {
    const {todoList} = this.state;
    return (
      <SafeAreaView style={StylesHomeScreen.container}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={Colors.WhiteColor}
        />
        <MyToolbar titleName={'Todo List'} />

        {this.state.todoList.length > 0 ? (
          <View style={StylesHomeScreen.viewRvStyle}>
            <DraggableFlatList
              data={this.state.todoList}
              renderItem={this.renderUpdateItem}
              keyExtractor={(item, index) => `draggable-item-${item.name}`}
              scrollPercent={5}
              onMoveEnd={({data}) => this.updateTodoList(data)}
            />
          </View>
        ) : (
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this._onRefresh}
              />
            }>
            <View style={StylesHomeScreen.noDataStyle}>
              <Text style={StylesHomeScreen.noDataAvailable}>
                {'No Todo List Available'}
              </Text>
            </View>
          </ScrollView>
        )}

        <View style={StylesHomeScreen.containerFabStyle}>
          <TouchableOpacity
            style={StylesHomeScreen.IconContianer}
            onPress={() => this.props.navigation.navigate('AddTodoListScreen')}>
            <Image
              source={require('../assets/icons/ic_tab_blue.png')}
              style={{width: wp('6.5%'), height: wp('6.5%')}}
            />
            <Text style={StylesHomeScreen.newReminderTextStyle}>
              New Reminder
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}
export {HomeScreen};
