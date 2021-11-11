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
import { StylesHomeScreen } from '../stylesheets';
import { MyToolbar } from '../components';
import { observer } from 'mobx-react';

@observer
class HomeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      refreshing: false,
      isLoading: false,
      text: '',
    };
  }

  componentDidMount() {
    const { navigation } = this.props;
    this.focusListener = navigation.addListener('didFocus', () => {});
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
          <View style={StylesHomeScreen.noDataStyle}>
            <Text style={StylesHomeScreen.noDataAvailable}>
              {'No Todo List Available'}
            </Text>
          </View>
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
