import React, {Component} from 'react';
import {CheckBox} from 'react-native-elements';
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
  SafeAreaView,
  Image,
} from 'react-native';
import moment from 'moment';
import {MyToolbar} from '../components';
import Colors from '../constants/Colors';
import {fireSnackBar} from '../constants/Utils';
import store from '../database/TodoListStore';
import {normalize, StylesHomeScreen} from '../stylesheets';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {insertSubTodo} from '../database/TodoListLocalStore';

class AddSubTodoListScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      todoLists: [],
      refreshing: false,
      isLoading: false,
      newItem: '',
      tagItem: '',
      todoItemName: '',
      dob: '',
      tagList: [],
      isDateTimePickerVisible: false,
      isTermsConditionChecked: false,
    };
  }

  componentDidMount() {
    const {navigation} = this.props;
    const todoItemName = this.props.navigation.state.params.todoItemName;
    console.log('todoItemName222', todoItemName);
    this.setState({todoItemName});
  }

  async addItem() {
    const {todoItemName, tagItem, newItem, isTermsConditionChecked, dob} =
      this.state;
    console.log(
      'todoItemName',
      todoItemName,
      'tagItem',
      tagItem,
      'newItem',
      newItem,
      'isTermsConditionChecked',
      isTermsConditionChecked,
      '__',
      dob,
    );
    Keyboard.dismiss();
    if (this.state.newItem === '') {
      fireSnackBar('Please Add Todo Name');
    } else {
      const element = {
        name: this.state.newItem,
        categoryName: todoItemName,
        isCompleted: false,
        tag: tagItem,
        isImportant: isTermsConditionChecked,
        dob: dob,
      };
      insertSubTodo(element)
        .then(async () => {
          console.log('insertSubTodo', 'SUCCESSFULLY');
          await store.addSubListItem(
            todoItemName,
            this.state.newItem,
            false,
            tagItem,
            isTermsConditionChecked,
            dob,
          );
          fireSnackBar('List successfully added');
          this.setState({
            newItem: '',
            tagItem: '',
            isTermsConditionChecked: false,
            dob: '',
          });
        })
        .catch(error => {
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

  updateTagItem(text) {
    this.setState({
      tagItem: text,
    });
  }

  updateDob(text) {
    this.setState({
      dob: text,
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

  addValueInTagList(item) {
    console.log('item', item);
    if (item != '') {
      var newStateArray = [];
      var element = {};
      element.label = item.trim();
      element.value = item.trim();
      newStateArray = this.state.tagList.slice();
      newStateArray.push(element);

      this.setState(
        {
          tagList: newStateArray,
          tagItem: '',
        },
        () => console.log('Tag', JSON.stringify(this.state.tagList)),
      );
    }
  }

  hideDatePicker = () => {
    this.setState({
      isDateTimePickerVisible: false,
    });
  };

  handleConfirm = date => {
    console.log('SelectedDate', moment(date).format('YYYY-MM-DD'));

    this.setState({
      isDateTimePickerVisible: false,
      dob: moment(date).format('YYYY-MM-DD'),
    });
  };

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
          titleName={'Add Sub Todo List'}
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
          <View style={styles.textInputContainer}>
            <TextInput
              value={this.state.newItem}
              onChangeText={text => this.updateNewItem(text)}
              style={styles.textInputStyle}
              placeholder={'Enter a todos'}
              returnKeyType={'next'}
              blurOnSubmit={false}
              onSubmitEditing={() => {
                this.dobTextInput.focus();
              }}
            />
          </View>
          <View style={styles.textInputContainer}>
            <TextInput
              ref={ref => (this.dobTextInput = ref)}
              value={this.state.dob}
              onChangeText={date =>
                this.setState({
                  dob: date,
                })
              }
              blurOnSubmit={false}
              style={styles.textInputStyle}
              placeholder={'Enter a Date'}
              returnKeyType={'next'}
              onSubmitEditing={() => this.tagTextInput.focus()}
            />
          </View>
          <View style={styles.textInputContainer}>
            <TextInput
              ref={ref => (this.tagTextInput = ref)}
              value={this.state.tagItem}
              onChangeText={tagItem1 =>
                this.setState({
                  tagItem: tagItem1,
                })
              }
              style={styles.textInputStyle}
              placeholder={'Enter a tag'}
              returnKeyType={'done'}
              onSubmitEditing={() => this.updateTagItem(this.state.tagItem)}
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: wp('2%'),
            }}>
            <TouchableOpacity
              style={{
                justifyContent: 'center',
                marginTop: hp('0.5%'),
              }}
              onPress={() =>
                this.setState({
                  isTermsConditionChecked: !this.state.isTermsConditionChecked,
                })
              }>
              <Image
                style={{height: 30, width: 30, tintColor: Colors.BlueColor}}
                source={
                  this.state.isTermsConditionChecked
                    ? require('../assets/icons/ic_checkbox_checked.png')
                    : require('../assets/icons/ic_checkbox_unchecked.png')
                }
              />
            </TouchableOpacity>

            <Text
              style={{
                fontSize: normalize(12),
                fontFamily: 'OpenSans-Medium',
                color: Colors.LightBlueColor,
                marginLeft: wp('2%'),
              }}
              allowFontScaling={false}>
              Mark As Important
            </Text>
          </View>

          <TouchableOpacity
            style={{
              width: wp('95%'),
              backgroundColor: Colors.BlueColor,
              borderRadius: wp('1.5%'),
              marginVertical: hp('5%'),
              alignItems: 'center',
              alignSelf: 'center',
              paddingVertical: hp('1.3%'),
            }}
            onPress={() => this.addItem()}
            activeOpacity={0.5}>
            <Text
              style={{
                fontSize: normalize(13.5),
                color: Colors.WhiteColor,
                fontFamily: 'Poppins-Regular',
              }}
              allowFontScaling={false}>
              Save
            </Text>
          </TouchableOpacity>

          {/* <TouchableOpacity
            onPress={() =>
              this.setState({
                isDateTimePickerVisible: true,
              })
            }>
            <Text>Select a Date :</Text>
            <Text>{this.state.dob}</Text>
          </TouchableOpacity> */}
        </ScrollView>
        {/* {this.state.isDateTimePickerVisible === true && (
          <DateTimePickerModal
            isVisible={this.state.isDateTimePickerVisible}
            mode="date"
            onConfirm={this.handleConfirm}
            onCancel={this.hideDatePicker}
            maximumDate={new Date()}
          />
        )} */}
      </SafeAreaView>
    );
  }
}
export {AddSubTodoListScreen};

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
    marginHorizontal: wp('2%'),
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
    paddingVertical: hp('1%'),
  },
});
