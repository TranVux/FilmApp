import {StyleSheet} from 'react-native';
import React from 'react';
import WebView from 'react-native-webview';

const DailymotionVideoPlayer = ({videoID}) => {
  return (
    <WebView
      source={{
        html: `
        <iframe style="width:100%;height:100%;position:absolute;left:0px;top:0px;overflow:hidden"" frameborder="0" type="text/html" src="https://geo.dailymotion.com/player.html?video=${videoID}" width="100%" height="100%" allowfullscreen allow="autoplay">
        </iframe>
        `,
      }}
      originWhitelist={['*']}
      allowsFullscreenVideo={true}
      allowsInlineMediaPlayback={true}
      javaScriptEnabled={true}
      domStorageEnabled={true}
      scrollEnabled={true}
      nestedScrollEnabled={true}
      scalesPageToFit={false}
      style={{
        width: '100%',
        height: '100%',
      }}
      containerStyle={{
        backgroundColor: 'white',
        width: '100%',
        aspectRatio: 16 / 9,
        zIndex: 10,
      }}
    />
  );
};

export default DailymotionVideoPlayer;

const styles = StyleSheet.create({});
