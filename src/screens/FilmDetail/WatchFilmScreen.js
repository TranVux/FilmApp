import {
  Dimensions,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import VideoPlayer from '../../components/VideoPlayer';
import {Colors} from '../../assets/colors';
import {Heading, Medium, SubHeading, SubSmall} from '../../assets/typography';
import {IconDownload, IconShare, IconView} from '../../assets/svgs';
import ButtonVerticalIcon from '../../components/ButtonVerticalIcon';
import {FILM_DATA} from '../../assets/data/FilmData';
import Film from '../../components/Film';

const WatchFilmScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{backgroundColor: Colors.primary, flex: 1}}>
      <VideoPlayer navigation={navigation} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1, backgroundColor: Colors.primary}}>
        <View style={styles.contentContainer}>
          <View style={{marginTop: 20}}>
            <Text style={[SubHeading]}>
              Sword Art Online the Movie: Progressive Scherzo of Deep Night
            </Text>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 8,
              }}>
              <IconView />
              <Text style={[SubSmall, {marginStart: 3}]}>152K</Text>
            </View>
          </View>

          {/* action container */}
          <View style={styles.actionContainer}>
            <ButtonVerticalIcon
              buttonLikeToggle={true}
              title="152K"
              initTintColorToggle={'#fff'}
              colorToggle={Colors.red}
            />
            <ButtonVerticalIcon title={'Download'}>
              <IconDownload />
            </ButtonVerticalIcon>
            <ButtonVerticalIcon title={'Share'}>
              <IconShare />
            </ButtonVerticalIcon>
            <ButtonVerticalIcon
              buttonBookmarkToggle={true}
              title="Bookmark"
              initTintColorToggle={'#fff'}
              colorToggle={Colors.red}
            />
          </View>

          {/*Episode container */}
          <View style={{marginTop: 15}}>
            <Text style={[Heading]}>Episode</Text>
            <ScrollView
              horizontal={true}
              showsHorizontalScrollIndicator={false}>
              <View style={styles.episodeContainer}>
                <Pressable
                  style={[styles.episode, {backgroundColor: Colors.secondary}]}>
                  <Text style={Medium}>1</Text>
                </Pressable>

                <Pressable
                  style={[
                    styles.episode,
                    {backgroundColor: '#252C571A', borderWidth: 1},
                  ]}>
                  <Text style={Medium}>2</Text>
                </Pressable>
                <Pressable
                  style={[
                    styles.episode,
                    {backgroundColor: '#252C571A', borderWidth: 1},
                  ]}>
                  <Text style={Medium}>2</Text>
                </Pressable>
                <Pressable
                  style={[
                    styles.episode,
                    {backgroundColor: '#252C571A', borderWidth: 1},
                  ]}>
                  <Text style={Medium}>2</Text>
                </Pressable>
                <Pressable
                  style={[
                    styles.episode,
                    {backgroundColor: '#252C571A', borderWidth: 1},
                  ]}>
                  <Text style={Medium}>2</Text>
                </Pressable>
                <Pressable
                  style={[
                    styles.episode,
                    {backgroundColor: '#252C571A', borderWidth: 1},
                  ]}>
                  <Text style={Medium}>2</Text>
                </Pressable>
                <Pressable
                  style={[
                    styles.episode,
                    {backgroundColor: '#252C571A', borderWidth: 1},
                  ]}>
                  <Text style={Medium}>2</Text>
                </Pressable>
                <Pressable
                  style={[
                    styles.episode,
                    {backgroundColor: '#252C571A', borderWidth: 1},
                  ]}>
                  <Text style={Medium}>2</Text>
                </Pressable>
                <Pressable
                  style={[
                    styles.episode,
                    {backgroundColor: '#252C571A', borderWidth: 1},
                  ]}>
                  <Text style={Medium}>2</Text>
                </Pressable>
                <Pressable
                  style={[
                    styles.episode,
                    {backgroundColor: '#252C571A', borderWidth: 1},
                  ]}>
                  <Text style={Medium}>2</Text>
                </Pressable>
              </View>
            </ScrollView>
            <ScrollView horizontal>
              <View style={styles.relativeFilmContainer}>
                <Pressable style={styles.relativeFilmItem}>
                  <Text style={[Medium, {fontSize: 10}]}>TV</Text>
                </Pressable>
                <Pressable style={styles.relativeFilmItem}>
                  <Text style={[Medium, {fontSize: 10}]}>TV</Text>
                </Pressable>
                <Pressable style={styles.relativeFilmItem}>
                  <Text style={[Medium, {fontSize: 10}]}>TV</Text>
                </Pressable>
                <Pressable style={styles.relativeFilmItem}>
                  <Text style={[Medium, {fontSize: 10}]}>TV</Text>
                </Pressable>
                <Pressable style={styles.relativeFilmItem}>
                  <Text style={[Medium, {fontSize: 10}]}>
                    Sword Art Online Progressive 1
                  </Text>
                </Pressable>
              </View>
            </ScrollView>
          </View>

          {/* Suggest container */}
          <View style={styles.suggestContainer}>
            <Text style={[Heading]}>Suggest for you</Text>
            <View style={styles.filmContainer}>
              {FILM_DATA.map((item, index) => {
                return (
                  <Film
                    data={item}
                    key={item._id}
                    style={styles.filmContainerStyle}
                  />
                );
              })}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default WatchFilmScreen;

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 15,
    flex: 1,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 40,
    backgroundColor: Colors.secondary,
    borderRadius: 8,
    elevation: 3,
    paddingVertical: 8,
    marginVertical: 15,
  },
  itemAction: {
    alignItems: 'center',
  },
  episodeContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  episode: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    marginEnd: 10,
    borderColor: Colors.secondary,
  },
  relativeFilmContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 15,
  },
  relativeFilmItem: {
    height: 25,
    borderRadius: 3,
    backgroundColor: Colors.secondary,
    paddingHorizontal: 20,
    marginEnd: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  suggestContainer: {
    marginTop: 30,
  },
  filmContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginTop: 15,
  },
  filmContainerStyle: {
    marginEnd: 0,
    marginBottom: 15,
  },
});
