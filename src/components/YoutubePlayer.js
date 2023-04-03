import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import YoutubePlayerIframe from 'react-native-youtube-iframe';
import Orientation from 'react-native-orientation-locker';
import {Colors} from '../assets/colors';

const YoutubePlayer = ({videoID, preventFullScreen}) => {
  const [fullScreen, setFullScreen] = React.useState(false);

  const handleOnFullChangeFullScreen = value => {
    setFullScreen(value);
  };

  React.useEffect(() => {
    if (fullScreen) {
      Orientation.lockToLandscapeLeft();
    } else {
      Orientation.unlockAllOrientations();
    }
  }, [fullScreen]);

  return (
    <View
      style={{
        width: '100%',
        aspectRatio: 16 / 9,
      }}>
      <YoutubePlayerIframe
        initialPlayerParams={{
          preventFullScreen: preventFullScreen,
          controls: true,
          rel: false,
          color: 'red',
          modestbranding: 1,
        }}
        onFullScreenChange={handleOnFullChangeFullScreen}
        height={300}
        play={false}
        videoId={videoID}
      />
    </View>
  );
};

export default YoutubePlayer;

const styles = StyleSheet.create({});
