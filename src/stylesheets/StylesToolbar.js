import {StyleSheet} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {normalize} from '../stylesheets/StyleFont';
import Colors from '../constants/Colors';

const StylesToolbar = StyleSheet.create({
  imageStyleMain: {
    height: wp('6%'),
    width: wp('5.5%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: wp('3%'),
    padding: wp('3%'),
  },
  imageStyleMainSub: {
    height: wp('6%'),
    width: wp('5.5%'),
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginLeft: wp('3%'),
    tintColor: Colors.WhiteColor,
  },
  containerView: {
    flexDirection: 'column',
    backgroundColor: Colors.AccentColor,
  },
  statusBarViewStyle: {
    width: wp('100%'),
    height: hp('3%'),
    backgroundColor: 'transparent',
  },
  innerContainerStyle: {
    flexDirection: 'row',
    width: wp('100%'),
    height: hp('7%'),
    alignItems: 'center',
  },
  drawerIconViewStyle: {
    position: 'absolute',
    zIndex: 2,
    flexDirection: 'row',
  },
  titleViewStyle: {
    position: 'absolute',
    width: wp('100%'),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  titleTextStyle: {
    letterSpacing: 1,
    justifyContent: 'center',
    alignSelf: 'center',
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: normalize(20),
    color: Colors.PrimaryColor,
  },
  searchSettingViewStyle: {
    position: 'absolute',
    right: wp('4%'),
    flexDirection: 'row',
  },
  imageStyleLogo: {
    height: wp('8%'),
    width: wp('26%'),
    justifyContent: 'center',
    alignSelf: 'center',
  },
});

export {StylesToolbar};
