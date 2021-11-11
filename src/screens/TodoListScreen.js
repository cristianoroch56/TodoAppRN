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
  ActivityIndicator,
  FlatList,
  Image,
} from 'react-native';
import {MyToolbar} from '../components';
import Colors from '../constants/Colors';
import {isEmpty} from '../constants/Utils';
import store from '../database/TodoListStore';
import {normalize, StylesHomeScreen} from '../stylesheets';
import {observer} from 'mobx-react';
import {deleteSubTodoList, updateSubTodo} from '../database/TodoListLocalStore';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

@observer
class TodoListScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      refreshing: false,
      isLoading: false,
      todoItemName: '',
      uniqueKey: 1,
    };
  }

  async componentDidMount() {
    const {navigation} = this.props;
    const todoItemName = this.props.navigation.state.params.item;
    this.setState({todoItemName});
    // this.focusListener = navigation.addListener('didFocus', () => {
    this.setState({isLoading: true}, () => {
      this.setState({isLoading: false});
    });
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

  removeListItem(name) {
    deleteSubTodoList(name)
      .then(() => {
        store.removeSubListItem(name);
      })
      .catch(error => {
        console.log(`deleteTodoList error ${error}`);
      });
  }

  async completeSubTodoList(item) {
    const element = {
      name: item.name,
      categoryName: item.categoryName,
      isCompleted: !item.isCompleted,
      tag: item.tag,
      isImportant: item.isImportant,
      dob: item.dob,
    };
    updateSubTodo(element)
      .then(res => {
        console.log('updateSubTodo@@@', JSON.stringify(res));
      })
      .catch(error => {
        console.log(`updateSubTodo error ${error}`);
      });
    await store.storeCompleteSubList(item.name);
    this.setState({uniqueKey: this.state.uniqueKey + 1});

    console.log(
      'completeSubTodoList after',
      JSON.stringify(store.getFilterSubTodoList(this.state.todoItemName)),
    );
  }

  async changeImportTodo(item) {
    const element = {
      name: item.name,
      categoryName: item.categoryName,
      isCompleted: item.isCompleted,
      tag: item.tag,
      isImportant: !item.isImportant,
      dob: item.dob,
    };
    updateSubTodo(element)
      .then(res => {
        console.log('updateSubTodo@@@', JSON.stringify(res));
      })
      .catch(error => {
        console.log(`updateSubTodo error ${error}`);
      });
    await store.storeCompleteSubList(item.name);
    this.setState({uniqueKey: this.state.uniqueKey + 1});

    console.log(
      'completeSubTodoList after',
      JSON.stringify(store.getFilterSubTodoList(this.state.todoItemName)),
    );
  }

  render() {
    const {isLoading, todoItemName, uniqueKey} = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={Colors.WhiteColor}
        />
        <MyToolbar
          onLeftImagePress={() => this.props.navigation.goBack()}
          titleName={'Todo List'}
          imageLeftStyle={{tintColor: Colors.BlueColor}}
          leftImage={require('../assets/icons/ic_back_white.png')}
        />

        {store.getFilterSubTodoList(todoItemName).length > 0 ? (
          <View key={uniqueKey} style={[StylesHomeScreen.viewRvStyle]}>
            <FlatList
              horizontal={false}
              data={store.getFilterSubTodoList(todoItemName)}
              renderItem={({item, index}) => (
                <View style={styles.itemContainer}>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => this.completeSubTodoList(item)}
                    style={styles.rbContainerStyle}>
                    <Image
                      style={{
                        height: wp('7%'),
                        width: wp('7%'),
                        tintColor: Colors.BlueColor,
                        paddingTop: hp('0.5%'),
                      }}
                      source={
                        item.isCompleted
                          ? require('../assets/icons/ic_checkbox_checked.png')
                          : require('../assets/icons/ic_checkbox_unchecked.png')
                      }
                    />
                  </TouchableOpacity>

                  <View
                    style={{
                      flexDirection: 'column',
                      flex: 1,
                      paddingHorizontal: wp('3%'),
                    }}>
                    <Text
                      style={styles.textTitleStyle}
                      numberOfLines={1}
                      allowFontScaling={false}>
                      {item.name.toUpperCase()}
                    </Text>
                    <View style={{flexDirection: 'row'}}>
                      {!isEmpty(item.dob) && (
                        <Text
                          style={styles.dateTextStyle}
                          numberOfLines={2}
                          allowFontScaling={false}>
                          {item.dob}
                        </Text>
                      )}
                      {!isEmpty(item.tag) && (
                        <Text
                          style={styles.hashTagTextStyle}
                          numberOfLines={2}
                          allowFontScaling={false}>
                          {`#${item.tag}`}
                        </Text>
                      )}
                    </View>
                  </View>
                  {item.isImportant && (
                    <TouchableOpacity
                      style={{
                        alignSelf: 'center',
                        padding: wp('1%'),
                      }}>
                      <Image
                        source={require('../assets/icons/ic_flag.png')}
                        style={{width: wp('4.5%'), height: wp('4.5%')}}
                      />
                    </TouchableOpacity>
                  )}

                  <TouchableOpacity
                    style={{
                      alignSelf: 'center',
                      padding: wp('1%'),
                    }}
                    onPress={() => this.removeListItem(item.name)}>
                    <Image
                      source={require('../assets/icons/ic_delete.png')}
                      style={{width: wp('5%'), height: wp('5%')}}
                    />
                  </TouchableOpacity>
                </View>
              )}
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
            <View style={styles.noDataStyle}>
              {!isLoading && (
                <Text style={styles.noDataAvailable}>
                  {'No Todo List Available'}
                </Text>
              )}
            </View>
          </ScrollView>
        )}

        <View style={StylesHomeScreen.containerFabStyle}>
          <TouchableOpacity
            style={StylesHomeScreen.IconContianer}
            onPress={() =>
              this.props.navigation.navigate('AddSubTodoListScreen', {
                todoItemName,
              })
            }>
            <Image
              source={require('../assets/icons/ic_tab_blue.png')}
              style={{width: wp('6.5%'), height: wp('6.5%')}}
            />

            <Text style={StylesHomeScreen.newReminderTextStyle}>
              New Reminder
            </Text>
          </TouchableOpacity>
        </View>
        {isLoading && (
          <ActivityIndicator
            color={Colors.LightBlueColor}
            animating={isLoading}
            size={'large'}
            style={StylesHomeScreen.loaderViewStyle}
          />
        )}
      </SafeAreaView>
    );
  }
}
export {TodoListScreen};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: Colors.WhiteColor,
  },
  itemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#ededed',
    width: wp('100%'),
    flexDirection: 'row',
    padding: hp('1%'),
    alignContent: 'center',
    justifyContent: 'center',
  },
  selectedItemContainer: {
    borderWidth: 1,
    borderColor: Colors.GreyColor,
    width: wp('100%'),
    flexDirection: 'row',
    padding: hp('1%'),
    alignContent: 'center',
    justifyContent: 'center',
  },
  textTitleStyle: {
    alignSelf: 'flex-start',
    fontSize: normalize(13),
    color: Colors.BlackColor,
    fontFamily: 'OpenSans-SemiBold',
    marginHorizontal: wp('1%'),
    paddingVertical: hp('0.3%'),
  },
  dateTextStyle: {
    alignSelf: 'flex-start',
    fontSize: normalize(12),
    color: Colors.GreyColor,
    fontFamily: 'OpenSans-Regular',
    marginHorizontal: wp('1%'),
    paddingVertical: hp('0.3%'),
  },
  hashTagTextStyle: {
    alignSelf: 'flex-start',
    fontSize: normalize(12),
    color: Colors.LightBlueColor,
    fontFamily: 'OpenSans-Medium',
    marginHorizontal: wp('1%'),
    paddingVertical: hp('0.3%'),
  },
  rbContainerStyle: {
    flexDirection: 'row',
    alignSelf: 'center',
    padding: wp('1%'),
  },
  noDataStyle: {
    height: hp('80%'),
    width: wp('100%'),
    alignContent: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  noDataAvailable: {
    color: Colors.PrimaryColor,
    fontSize: normalize(18),
    fontFamily: 'OpenSans-Regular',
    margin: hp('10%'),
    alignItems: 'center',
    textAlign: 'center',
  },
});
