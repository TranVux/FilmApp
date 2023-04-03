import {Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../../assets/colors';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import {IconBack, IconHeart, IconPlayOutlineSmall} from '../../assets/svgs';
import {Heading, SubHeadingRegular, TextButton} from '../../assets/typography';
import {Button} from '@rneui/themed';
import YoutubePlayer from '../../components/YoutubePlayer';

const FilmDetail = ({navigation, route}) => {
  const {data} = route.params;

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled={true}
      contentContainerStyle={{flexGrow: 1, backgroundColor: Colors.primary}}>
      <View style={{flex: 1, paddingBottom: 80}}>
        <FastImage
          source={{
            uri: data.thumbnail.path,
          }}
          style={styles.thumbnailStyle}
          resizeMode={FastImage.resizeMode.cover}>
          <LinearGradient
            style={styles.desFilmContainer}
            colors={[Colors.primary, '#1A1B4280', Colors.primary]}>
            <View style={styles.header}>
              <Pressable
                onPress={() => {
                  navigation.goBack();
                }}>
                <IconBack width={27} height={27} />
              </Pressable>
              <IconHeart width={27} height={27} />
            </View>
            <View
              style={{
                paddingHorizontal: 10,
                justifyContent: 'space-between',
              }}>
              <Text style={[Heading]}>{data.name}</Text>
              <Text style={[SubHeadingRegular, {color: '#FFFFFFB2'}]}>
                {data.list_category.map((item, index, data) => {
                  if (index >= data.length - 1) return item.name;
                  return item.name.concat('/');
                })}
              </Text>
              <ScrollView
                nestedScrollEnabled={true}
                style={{maxHeight: 170, marginTop: 10}}>
                <Text style={[SubHeadingRegular]}>{data.synopsis}</Text>
              </ScrollView>
            </View>
          </LinearGradient>
        </FastImage>
        <Button
          onPress={() => {
            navigation.navigate('WatchFilmScreen', {data, episodeIndex: 0});
          }}
          iconPosition="left"
          icon={<IconPlayOutlineSmall />}
          title={'Play now'}
          containerStyle={styles.buttonContainer}
          buttonStyle={styles.buttonPlayStyle}
          titleStyle={styles.titleStyle}
        />

        {/* Video player container */}
        <View style={{paddingHorizontal: 15, marginTop: 25, flex: 1}}>
          <Text style={[Heading]}>Trailer</Text>
          {/* <VideoPlayer preview style={styles.videoPlayer} /> */}
          <YoutubePlayer preventFullScreen={true} videoID={data.trailer} />
        </View>
      </View>
    </ScrollView>
  );
};

export default FilmDetail;

const styles = StyleSheet.create({
  thumbnailStyle: {
    height: 450,
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  desFilmContainer: {
    height: '100%',
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 10,
    justifyContent: 'space-between',
  },
  buttonPlayStyle: {
    width: 160,
    height: 50,
    borderRadius: 50,
    backgroundColor: Colors.red_second,
  },
  titleStyle: {
    ...TextButton,
    marginStart: 3,
  },
  buttonContainer: {
    marginTop: 20,
    overflow: 'hidden',
    alignSelf: 'center',
    backgroundColor: 'black',
    width: 160,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  videoPlayer: {
    marginTop: 15,
    borderRadius: 5,
    overflow: 'hidden',
  },
});
