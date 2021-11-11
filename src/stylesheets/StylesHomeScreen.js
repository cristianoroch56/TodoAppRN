import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {normalize} from '../stylesheets/StyleFont';
import Colors from '../constants/Colors';

const StylesHomeScreen = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  noDataAvailable: {
    color: Colors.PrimaryColor,
    fontSize: normalize(18),
    margin: hp('10%'),
    alignItems: 'center',
    textAlign: 'center',
  },
  viewRvStyle: {
    paddingBottom: hp('15%'),
    flex: 1,
    alignContent: 'center',
    alignSelf: 'center',
    width: wp('100%'),
  },
  noDataStyle: {
    height: hp('80%'),
    width: wp('100%'),
    alignContent: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
  },
  fabStyle: {
    borderWidth: 0,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: wp('18%'),
    position: 'absolute',
    bottom: hp('3%'),
    right: wp('5%'),
    height: wp('18%'),
    backgroundColor: Colors.AccentColor,
    borderRadius: wp('18%'),
  },
  fabStyleText: {
    color: Colors.WhiteColor,
    fontSize: normalize(24),
  },
  itemContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#ededed',
    flexDirection: 'row',
    marginBottom: hp('0.5%'),
    alignContent: 'center',
    justifyContent: 'center',
  },
  item: {
    color: Colors.LightBlueColor,
    fontSize: normalize(15),
    flex: 4,
    padding: hp('2%'),
    alignSelf: 'center',
  },
  deleteItem: {
    flex: 1,
    padding: hp('2.5%'),
    color: '#a3a3a3',
    fontWeight: 'bold',
    marginVertical: hp('0.3%'),
    backgroundColor: '#ededed',
    alignItems: 'center',
    textAlign: 'center',
  },
  loaderViewStyle: {
    position: 'absolute',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    elevation: 10,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10,
  },
});

export {StylesHomeScreen};
