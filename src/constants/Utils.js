import Snackbar from 'react-native-snackbar';
import Colors from './Colors';

export const fireSnackBar = message => {
  Snackbar.show({
    text: message,
    duration: Snackbar.LENGTH_LONG,
    textColor: Colors.SecondaryColor,
    backgroundColor: Colors.WhiteColor,
  });
};

export const isEmpty = data => {
  if (data !== null && data !== '' && data !== undefined) {
    return false;
  }
  return true;
};
