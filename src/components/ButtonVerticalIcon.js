import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Pressable} from 'react-native';
import {SubSmall} from '../assets/typography';
import {IconBookmark, IconLike} from '../assets/svgs';

const DEFAULT_FUNCTION = () => {};

const ButtonVerticalIcon = ({
  children,
  onPress = DEFAULT_FUNCTION,
  style,
  title,
  buttonLikeToggle,
  buttonBookmarkToggle,
  initTintColorToggle,
  colorToggle,
  //   here is tint color of icon
}) => {
  const [tintColor, setTintColor] = React.useState(initTintColorToggle);
  const handlePress = () => {
    if (buttonLikeToggle || buttonBookmarkToggle) {
      handleToggle();
    }
    onPress();
  };

  const handleToggle = () => {
    if (tintColor === initTintColorToggle) {
      setTintColor(colorToggle);
    } else {
      setTintColor(initTintColorToggle);
    }
    console.log(1);
  };

  return (
    <Pressable onPress={handlePress} style={{alignItems: 'center'}}>
      {buttonLikeToggle && <IconLike fillColor={tintColor} />}
      {buttonBookmarkToggle && <IconBookmark fillColor={tintColor} />}
      {!buttonBookmarkToggle && !buttonLikeToggle && children}
      <Text style={[SubSmall, {marginTop: 3}]}>{title}</Text>
    </Pressable>
  );
};

export default ButtonVerticalIcon;

const styles = StyleSheet.create({});
