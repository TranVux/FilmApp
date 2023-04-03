import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {IconStar} from '../assets/svgs';
import {Title, SubHeading, SubSmall} from '../assets/typography';
import {Pressable} from 'react-native';

const DEFAULT_FUNCTION = () => {};

const Film = ({
  data,
  style,
  onPress = DEFAULT_FUNCTION,
  textBox,
  index,
  gap,
  endIndex,
}) => {
  return (
    <Pressable
      style={[
        styles.container,
        {
          marginEnd: !index ? 20 : index % 2 === 0 ? 0 : gap,
        },
        {...style},
      ]}
      onPress={onPress}>
      <FastImage
        source={{
          uri: data?.thumbnail.path,
        }}
        style={[styles.imageStyle, {}]}>
        {!textBox ? (
          <View style={styles.starContainer}>
            <IconStar width={12} height={12} />
            <Text style={[SubHeading, {marginStart: 3}]}>{data?.score}</Text>
          </View>
        ) : (
          <View style={styles.historyEpisode}>
            <Text numberOfLines={1} style={[SubSmall, {color: '#fff'}]}>
              {textBox}
            </Text>
          </View>
        )}
      </FastImage>
      <Text style={[Title, {width: '100%', marginTop: 5}]} numberOfLines={3}>
        {data?.name ? data.name : 'Display Film Name'}
      </Text>
    </Pressable>
  );
};

export default Film;

const styles = StyleSheet.create({
  container: {
    width: 150,
    marginEnd: 20,
  },
  imageStyle: {
    borderRadius: 10,
    width: 150,
    height: 212,
    alignItems: 'flex-end',
    elevation: 10,
  },
  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },

  historyEpisode: {
    maxWidth: 70,
    paddingHorizontal: 10,
    backgroundColor: '#1A1B42D9',
    margin: 10,
    color: '#fff',
    paddingVertical: 5,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
