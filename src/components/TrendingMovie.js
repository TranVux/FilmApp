import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';

import {SubHeading, SubHeadingRegular} from '../assets/typography';
import {MapGradientColorTrending} from '../assets/colors';
import {Pressable} from 'react-native';

const DEFAULT_FUNCTION = () => {};

const TrendingMovie = ({data, onPress = DEFAULT_FUNCTION, navigation}) => {
  // const
  const _createdDate = new Date(data.createdDate).getFullYear();
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <FastImage
        source={{uri: data.background_medium.path}}
        style={{width: '100%', height: '100%'}}
        resizeMode={FastImage.resizeMode.cover}
      />
      <LinearGradient
        colors={MapGradientColorTrending}
        style={styles.containerStyle}>
        <Text style={[SubHeading]} numberOfLines={2}>
          {data.name}
        </Text>
        <Text style={[SubHeadingRegular]}>{_createdDate}</Text>
      </LinearGradient>
    </Pressable>
  );
};

export default TrendingMovie;

const styles = StyleSheet.create({
  containerStyle: {
    position: 'absolute',
    width: '100%',
    zIndex: 10,
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  container: {
    width: 250,
    height: 182,
    borderRadius: 13,
    overflow: 'hidden',
    elevation: 5,
  },
});
