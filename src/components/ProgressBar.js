import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Slider} from '@rneui/themed';
import {Colors} from '../assets/colors';

const ProgressBar = ({
  duration,
  currentTime,
  onSeek,
  onComplete,
  onStartSlide,
}) => {
  const getMinuteFromSecond = currentTime => {
    const seconds = currentTime >= 60 ? Math.floor(currentTime / 60) : 0;
    const minutes = Math.floor(currentTime - seconds * 60);
    return `${seconds >= 10 ? seconds : '0' + seconds}:${
      minutes >= 10 ? minutes : '0' + minutes
    }`;
  };

  const _duration = getMinuteFromSecond(duration);
  const position = getMinuteFromSecond(currentTime);

  return (
    <View style={styles.progressBar}>
      <Text
        style={{
          color: '#fff',
          fontFamily: 'regular',
          fontSize: 10,
        }}>
        {position}
      </Text>
      <Slider
        minimumTrackTintColor={Colors.red_second}
        maximumTrackTintColor="#FFFFFFBD"
        maximumValue={duration}
        value={currentTime}
        onValueChange={onSeek}
        style={{flex: 1, marginHorizontal: 5}}
        thumbStyle={{width: 12, height: 12}}
        onSlidingComplete={onComplete}
      />
      <Text
        style={{
          color: '#fff',
          fontFamily: 'regular',
          fontSize: 10,
        }}>
        {_duration}
      </Text>
    </View>
  );
};

export default ProgressBar;

const styles = StyleSheet.create({
  progressBar: {
    flexGrow: 1,
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginEnd: 10,
  },
});
