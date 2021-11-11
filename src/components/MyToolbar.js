/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {StylesToolbar} from '../stylesheets';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const MyToolbar = ({
  titleName,
  leftImage,
  onLeftImagePress,
  imageLeftStyle,
}) => (
  <View style={StylesToolbar.containerView}>
    <View style={StylesToolbar.innerContainerStyle}>
      {leftImage != null && (
        <TouchableOpacity
          onPress={onLeftImagePress}
          style={StylesToolbar.drawerIconViewStyle}>
          <Image
            style={[StylesToolbar.imageStyleMain, imageLeftStyle]}
            resizeMode={'contain'}
            source={leftImage}
          />
        </TouchableOpacity>
      )}
      <View
        style={
          leftImage != null
            ? StylesToolbar.titleViewStyle
            : [
                StylesToolbar.titleViewStyle,
                {
                  marginLeft: wp('4%'),
                },
              ]
        }>
        <Text style={StylesToolbar.titleTextStyle} allowFontScaling={false}>
          {titleName}
        </Text>
      </View>
    </View>
  </View>
);
export {MyToolbar};
