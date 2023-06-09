import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {TextInput} from 'react-native-gesture-handler';
import {Colors} from '../assets/colors';
import {IconEye, IconEyeOff} from '../assets/svgs';
import {Pressable} from 'react-native';
import {HeadingRegular, Medium15} from '../assets/typography';

const DEFAULT_FUNCTION = () => {};

const InputField = ({
  title,
  securePassword,
  containerStyle,
  textInputStyle,
  placeholder,
  onChangeText = DEFAULT_FUNCTION,
}) => {
  const [showPass, setShowPass] = React.useState(securePassword ? true : false);

  const handleToggleShowPass = () => {
    setShowPass(!showPass);
  };

  return (
    <View
      style={[
        styles.textInput,
        {
          paddingHorizontal: 20,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        },
        containerStyle,
      ]}>
      <TextInput
        style={[styles.textInput, textInputStyle]}
        placeholder={placeholder}
        secureTextEntry={showPass}
        onChangeText={onChangeText}
        placeholderTextColor={'#1A1B42CC'}
      />
      {securePassword && (
        <Pressable onPress={handleToggleShowPass}>
          {showPass ? <IconEyeOff /> : <IconEye />}
        </Pressable>
      )}
    </View>
  );
};

export default InputField;

const styles = StyleSheet.create({
  textInput: {
    flex: 1,
    height: 49,
    backgroundColor: '#fff',
    borderRadius: 8,
    ...Medium15,
    color: '#1A1B42',
  },
});
