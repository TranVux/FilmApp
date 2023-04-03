import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import WebView from 'react-native-webview';

const WebViewScreen = () => {
  return (
    <SafeAreaView style={{flex: 1}}>
      <WebView
        style={{width: '100%', height: 480}}
        allowsInlineMediaPlayback={true}
        allowsFullscreenVideo={true}
        javaScriptEnabled={true}
        cacheEnabled
        source={{
          html: '<iframe width="100%" style="aspect-ratio: 16/9;" src="https://short.ink/K6P662qca" frameborder="0" scrolling="0" allowfullscreen></iframe>',
        }}
      />
    </SafeAreaView>
  );
};

export default WebViewScreen;

const styles = StyleSheet.create({});
