import {StatusBar, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import Video from 'react-native-video';
import {
  IconBack,
  IconFullScreen,
  IconFullScreenOff,
  IconNext,
  IconPlayerOutline,
  IconPlayerOutlinePause,
  IconPrevious,
} from '../assets/svgs';
import {Pressable} from 'react-native';
import {SubHeadingRegular} from '../assets/typography';
import ProgressBar from './ProgressBar';
import Orientation from 'react-native-orientation-locker';
import {Dimensions} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

let WIDTH_SCREEN = Dimensions.get('screen').width;
let HEIGHT_SCREEN = Dimensions.get('screen').height;

const VideoPlayer = ({preview, style, navigation, data}) => {
  const videoPlayerRef = React.useRef();

  const [fullScreen, setFullScreen] = React.useState(false);
  const [isPlay, setIsPlay] = React.useState(false);
  const [duration, setDuration] = React.useState(0);
  const [currentDuration, setCurrentDuration] = React.useState(0);
  const [showControl, setShowControl] = React.useState(true);
  const [dimensions, setDimensions] = React.useState({
    width: WIDTH_SCREEN,
    height: HEIGHT_SCREEN,
  });

  const handleToggleShowControl = () => {
    setShowControl(!showControl);
  };

  const handleTogglePlay = () => {
    setIsPlay(!isPlay);
  };

  const skipBackWard = () => {
    setCurrentDuration(currentDuration - 10);
    videoPlayerRef.current.seek(currentDuration - 10);
  };

  const skipForWard = () => {
    setCurrentDuration(currentDuration + 10);
    videoPlayerRef.current.seek(currentDuration + 10);
  };

  const handleComplete = () => {
    console.log('Complete');
  };

  const handleSeek = value => {
    videoPlayerRef.current.seek(value);
    setCurrentDuration(value);
  };

  const handleProgressVideo = ({currentTime}) => {
    setCurrentDuration(currentTime);
  };

  const handleLoadEnd = data => {
    setDuration(data.duration);
    setCurrentDuration(data.currentTime);
  };

  const handleEndVideo = () => {
    setIsPlay(false);
    videoPlayerRef.current.seek(0);
    setCurrentDuration(0);
  };

  const handleFullScreen = () => {
    if (fullScreen) {
      Orientation.unlockAllOrientations();
    } else {
      Orientation.lockToLandscapeLeft();
    }
    console.log(!fullScreen);
  };

  const handleBackButton = navigation => {
    if (navigation != null) navigation.goBack();
  };

  const handleOrientation = orientation => {
    if (orientation === 'LANDSCAPE-LEFT' || orientation === 'LANDSCAPE-RIGHT') {
      setFullScreen(true);
      StatusBar.setHidden(true);
    } else {
      setFullScreen(false);
      StatusBar.setHidden(false);
    }
  };

  useEffect(() => {
    Orientation.addOrientationListener(handleOrientation);

    const subscription = Dimensions.addEventListener('change', ({window}) => {
      const {width, height} = window;
      setDimensions({width, height});
    });
    return () => subscription?.remove();
  });

  return (
    <SafeAreaView
      style={[
        fullScreen
          ? {
              width: preview ? '100%' : dimensions.width,
              height: dimensions.height,
            }
          : {
              width: preview ? '100%' : dimensions.width,
              height: dimensions.width * (9 / 16),
            },
        styles.videoContainer,
        {...style},
      ]}>
      <Pressable
        style={[
          fullScreen
            ? {
                width: preview ? '100%' : dimensions.width,
                height: dimensions.height,
              }
            : {
                width: preview ? '100%' : dimensions.width,
                height: dimensions.width * (9 / 16),
              },
        ]}
        onPress={handleToggleShowControl}>
        <Video
          style={styles.videoStyle}
          // source={{uri: 'https://www.w3schools.com/html/mov_bbb.mp4'}}
          source={{
            uri: 'https://player.vimeo.com/progressive_redirect/playback/673786323/rendition/720p?loc=external&oauth2_token_id=1027659655&signature=f376cb2ae4853b5294197795734ea03145105511edf54eed9f201fcc85416609',
          }}
          ref={videoPlayerRef}
          volume={100}
          controls={false}
          resizeMode={'stretch'}
          paused={!isPlay}
          onProgress={handleProgressVideo}
          onLoad={handleLoadEnd}
          onEnd={handleEndVideo}
        />
        {/* Video controller */}
        {showControl && (
          <View style={styles.videoController}>
            <View style={styles.headerVideoPlayer}>
              {!preview && (
                <Pressable
                  onPress={() => {
                    handleBackButton(navigation);
                  }}>
                  <IconBack />
                </Pressable>
              )}
              <Text
                numberOfLines={1}
                style={[SubHeadingRegular, {marginStart: 5, fontSize: 14}]}>
                Sword Art Online Progressive 2 Trailer
              </Text>
            </View>
            <View style={styles.mainVideoController}>
              <Pressable onPress={skipBackWard}>
                <IconPrevious />
              </Pressable>
              <Pressable onPress={handleTogglePlay}>
                {isPlay ? <IconPlayerOutlinePause /> : <IconPlayerOutline />}
              </Pressable>
              <Pressable onPress={skipForWard}>
                <IconNext />
              </Pressable>
            </View>
            <View style={styles.bottomVideoController}>
              <ProgressBar
                currentTime={currentDuration}
                duration={duration > 0 ? duration : 0}
                onSeek={handleSeek}
                onComplete={handleComplete}
              />
              {!preview && (
                <Pressable onPress={handleFullScreen}>
                  {fullScreen ? <IconFullScreenOff /> : <IconFullScreen />}
                </Pressable>
              )}
            </View>
          </View>
        )}
      </Pressable>
    </SafeAreaView>
  );
};

export default VideoPlayer;

const styles = StyleSheet.create({
  videoContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  videoContainerFullScreen: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  videoStyle: {
    width: '100%',
    height: '100%',
  },
  fullScreenVideo: {},
  videoController: {
    position: 'absolute',
    backgroundColor: '#0000004F',
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 10,
  },
  mainVideoController: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  bottomVideoController: {
    height: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerVideoPlayer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
