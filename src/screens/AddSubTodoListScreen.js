import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  RefreshControl,
  Keyboard,
  TextInput,
} from 'react-native';
import { MyToolbar } from '../components';
import Colors from '../constants/Colors';
import { fireSnackBar } from '../constants/Utils';
import store from '../database/TodoListStore';
import { StylesHomeScreen } from '../stylesheets';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { insertSubTodo } from '../database/TodoListLocalStore';

class AddSubTodoListScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todoLists: [],
      refreshing: false,
      isLoading: false,
      newItem: '',
      todoItemName: '',
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    const todoItemName = this.props.navigation.state.params.todoItemName;
    console.log('todoItemName222', todoItemName);
    this.setState({ todoItemName });
  }

  async addItem() {
    const { todoItemName } = this.state;
    console.log('todoItemName', todoItemName);
    Keyboard.dismiss();
    if (this.state.newItem === '') {
      fireSnackBar('Please Add Todo Name');
    } else {
      const element = {
        name: this.state.newItem,
        categoryName: todoItemName,
      };
      insertSubTodo(element)
        .then(async () => {
          console.log('insertSubTodo', 'SUCCESSFULLY');
          await store.addSubListItem(todoItemName, this.state.newItem);
          fireSnackBar('List successfully added');
          this.setState({
            newItem: '',
          });
        })
        .catch((error) => {
          // alert(`Insert new todoList error ${error}`);
          console.log(`insertSubTodo error ${error}`);
        });
    }
  }

  updateNewItem(text) {
    this.setState({
      newItem: text,
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

  render() {
    const { isLoading, todoLists } = this.state;
    return (
      <View style={StylesHomeScreen.container}>
        <StatusBar
          hidden={false}
          backgroundColor={'transparent'}
          translucent
          barStyle='dark-content'
        />
        <MyToolbar
          titleName={'Add Sub Todo List'}
          leftImage={require('../assets/images/ic_left_arrow.png')}
          onLeftImagePress={() => this.props.navigation.goBack(null)}
        />
        <ScrollView
          keyboardShouldPersistTaps='always'
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
        >
          <View
            style={{
              flex: 1,
              height: hp('80%'),
              width: wp('100%'),
              alignContent: 'center',
              alignSelf: 'center',
              alignItems: 'center',
            }}
          >
            <View style={{ flexDirection: 'row' }}>
              <TextInput
                value={this.state.newItem}
                onChangeText={(text) => this.updateNewItem(text)}
                style={styles.input}
              />
              <TouchableOpacity
                onPress={() => this.addItem()}
                style={styles.button}
              >
                <Text>Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
export { AddSubTodoListScreen };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.LightBlueColor,
  },
  headingText: {
    color: Colors.LightBlueColor,
    fontWeight: 'bold',
  },
  input: {
    height: 70,
    backgroundColor: '#ededed',
    padding: 20,
    flex: 1,
  },
  button: {
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#ededed',
  },

  noItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
