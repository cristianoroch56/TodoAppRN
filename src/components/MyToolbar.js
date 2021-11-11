/* eslint-disable prettier/prettier */
import React from 'react';
import {View, Text, TouchableOpacity, Image} from 'react-native';
import {StylesToolbar} from '../stylesheets';

const MyToolbar = ({titleName, leftImage, onLeftImagePress}) => (
  <View style={StylesToolbar.containerView}>
    <View style={StylesToolbar.statusBarViewStyle} />

    <View style={StylesToolbar.innerContainerStyle}>
      <View style={StylesToolbar.drawerIconViewStyle}>
        <TouchableOpacity onPress={onLeftImagePress}>
          {leftImage != null ? (
            <Image
              style={StylesToolbar.imageStyleMain}
              resizeMode={'contain'}
              source={leftImage}
            />
          ) : (
            <View />
          )}
        </TouchableOpacity>
      </View>

      <View style={StylesToolbar.titleViewStyle}>
        <Text style={StylesToolbar.titleTextStyle} allowFontScaling={false}>
          {titleName}
        </Text>
      </View>
    </View>
  </View>
);
export {MyToolbar};
