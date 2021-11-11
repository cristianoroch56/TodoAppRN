import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { MyToolbar } from '../components';
import Colors from '../constants/Colors';
import { normalize, StylesHomeScreen } from '../stylesheets';
import { observer } from 'mobx-react';
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
    };
  }

  async componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {
      this.setState({ isLoading: true }, () => {
        this.setState({ isLoading: false });
      });
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
    const { isLoading, todoItemName } = this.state;
    return (
      <View style={StylesHomeScreen.container}>
        <StatusBar
          hidden={false}
          backgroundColor={'transparent'}
          translucent
          barStyle='dark-content'
        />
        <MyToolbar
          titleName={'Todo List'}
          leftImage={require('../assets/images/ic_left_arrow.png')}
          onLeftImagePress={() => this.props.navigation.goBack(null)}
        />
        <View style={styles.heading}>
          <Text style={styles.headingText}>ToDo List Name</Text>
        </View>
        <ScrollView
          style={{ marginTop: hp('11%') }}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }
        >
          <View style={StylesHomeScreen.noDataStyle}>
            {!isLoading && (
              <Text style={StylesHomeScreen.noDataAvailable}>
                {'No Todo List Available'}
              </Text>
            )}
          </View>
        </ScrollView>
        <TouchableOpacity style={StylesHomeScreen.fabStyle}>
          <Text style={StylesHomeScreen.fabStyleText}>+</Text>
        </TouchableOpacity>

        {isLoading && (
          <ActivityIndicator
            color={Colors.LightBlueColor}
            animating={isLoading}
            size={'large'}
            style={StylesHomeScreen.loaderViewStyle}
          />
        )}
      </View>
    );
  }
}
export { TodoListScreen };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading: {
    height: hp('10%'),
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: Colors.LightBlueColor,
    position: 'absolute',
    top: hp('10%'),
    width: wp('100%'),
  },
  headingText: {
    color: Colors.LightBlueColor,
    fontWeight: 'bold',
    fontSize: normalize(15),
  },
});