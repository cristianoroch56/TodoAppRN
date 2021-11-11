import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  RefreshControl,
  Keyboard,
  TextInput,
  Image,
} from 'react-native';
import {MyToolbar} from '../components';
import Colors from '../constants/Colors';
import {fireSnackBar} from '../constants/Utils';
import store from '../database/TodoListStore';
import {normalize, StylesHomeScreen} from '../stylesheets';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {insertTodo} from '../database/TodoListLocalStore';

class AddTodoListScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todoLists: [],
      refreshing: false,
      isLoading: false,
      newItem: '',
    };
  }

  async addItem() {
    Keyboard.dismiss();
    if (this.state.newItem === '') {
      fireSnackBar('Please Add Todo Name');
    } else {
      const element = {
        name: this.state.newItem,
      };
      insertTodo(element)
        .then(async () => {
          console.log('insertTodo', 'SUCCESSFULLY');
          await store.addItem(this.state.newItem);
          fireSnackBar('List successfully added');
          this.setState({
            newItem: '',
          });
        })
        .catch(error => {
          // alert(`Insert new todoList error ${error}`);
          console.log(`insertTodo error ${error}`);
        });
    }
  }

  updateNewItem(text) {
    this.setState({
      newItem: text,
    });
  }

  componentDidMount() {
    const {navigation} = this.props;

    // this.focusListener = navigation.addListener('didFocus', () => {

    // });
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

  render() {
    const {isLoading, todoLists} = this.state;
    return (
      <SafeAreaView style={StylesHomeScreen.container}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={Colors.WhiteColor}
        />
        <MyToolbar
          onLeftImagePress={() => this.props.navigation.goBack()}
          titleName={'Add Todo List'}
          imageLeftStyle={{tintColor: Colors.BlueColor}}
          leftImage={require('../assets/icons/ic_back_white.png')}
        />
        <ScrollView
          keyboardShouldPersistTaps="always"
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }>
          <View
            style={{
              flex: 1,
              height: hp('80%'),
              width: wp('100%'),
              alignContent: 'center',
              alignSelf: 'center',
              alignItems: 'center',
            }}>
            <View style={styles.textInputContainer}>
              <TextInput
                value={this.state.newItem}
                onChangeText={text => this.updateNewItem(text)}
                style={styles.textInputStyle}
                placeholder={'Enter a todos'}
                returnKeyType={'go'}
                onSubmitEditing={() => this.addItem()}
              />
              <TouchableOpacity
                onPress={() => this.addItem()}
                style={{
                  alignSelf: 'center',
                  padding: wp('3.5%'),
                }}>
                <Image
                  source={require('../assets/icons/ic_add.png')}
                  style={{width: wp('6.5%'), height: wp('6.5%')}}
                />
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
export {AddTodoListScreen};

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
  textInputStyle: {
    marginLeft: wp('2%'),
    flex: 1,
    flexDirection: 'row',
    fontFamily: 'OpenSans-Medium',
    fontSize: normalize(12.5),
    color: Colors.BlackColor,
    borderRadius: wp('1%'),
    borderWidth: wp('0.23%'),
    borderColor: Colors.GreyColor,
    minHeight: hp('6%'),
    maxHeight: hp('15%'),
  },
  textAddStyle: {
    fontFamily: 'OpenSans-Medium',
    fontSize: normalize(13),
    color: Colors.BlueColor,
  },
  textInputContainer: {
    flexDirection: 'row',
    width: wp('100%'),
    backgroundColor: '#ededed',
    paddingVertical: hp('1%'),
  },
});
