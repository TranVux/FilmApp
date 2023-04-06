import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Animated} from 'react-native';
import {Medium15} from '../assets/typography';

const Dialog = ({navigation, children, title = 'Đây là title'}) => {
  const scaleAnimated = React.useRef(new Animated.Value(0)).current;
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.dialogContentArea}>
        <Text style={[Medium15]}>{title}</Text>
        {children}
      </View>
    </SafeAreaView>
  );
};

export default Dialog;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: '#00000060',
    position: 'absolute',
    zIndex: 10,
    top: 0,
    left: 0,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 50,
  },
  dialogContentArea: {
    backgroundColor: '#fff',
    width: '100%',
    minHeight: 30,
    borderRadius: 5,
  },
});
