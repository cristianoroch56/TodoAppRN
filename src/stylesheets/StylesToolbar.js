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
    width: wp('6%'),
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
    flexDirection: 'row',
    width: wp('100%'),
    height: hp('7%'),
    backgroundColor: 'aqua',
    alignItems: 'center',
    alignSelf: 'center',
  },
  statusBarViewStyle: {
    width: wp('100%'),
    height: hp('3%'),
    backgroundColor: 'red',
  },
  innerContainerStyle: {
    backgroundColor: Colors.WhiteColor,
    flexDirection: 'row',
    width: wp('100%'),
    height: hp('7%'),
    alignItems: 'center',
    alignSelf: 'center',
  },
  drawerIconViewStyle: {
    alignItems: 'center',
    padding: wp('1%'),
    marginLeft: wp('2%'),
  },
  titleViewStyle: {
    width: wp('100%'),
  },
  titleTextStyle: {
    fontFamily: 'OpenSans-SemiBold',
    fontSize: normalize(17),
    color: Colors.BlueColor,
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
