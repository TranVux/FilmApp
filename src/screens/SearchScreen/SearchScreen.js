import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import {Pressable} from 'react-native';
import {
  IconNotify,
  IconPlayOutlineSmall,
  IconSearch,
  IconSetting,
  IconStar,
  Logo,
} from '../../assets/svgs';
import {Colors} from '../../assets/colors';
import {Heading, Regular17, SubHeading} from '../../assets/typography';
import Carousel from 'react-native-anchor-carousel';
import {FILM_DATA} from '../../assets/data/FilmData';
import FastImage from 'react-native-fast-image';
import {SafeAreaView} from 'react-native-safe-area-context';
import Film from '../../components/Film';

const {width: WINDOW_WIDTH} = Dimensions.get('window');

const SearchScreen = ({navigation}) => {
  const carousel = React.useRef(null);
  const [currentFilmSelect, setCurrentFilmSelect] = React.useState(
    FILM_DATA[0],
  );

  const renderItemNewestFilm = ({item, index}) => {
    const {image, star} = item;

    return (
      <Pressable
        style={{width: 180}}
        onPress={() => {
          carousel.current.scrollToIndex(index);
          setCurrentFilmSelect(FILM_DATA[index]);
        }}>
        <FastImage style={styles.itemFilm} source={{uri: image}} />
        <View
          style={{
            position: 'absolute',
            top: 12,
            end: 12,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <IconStar />
          <Text style={[SubHeading, {marginStart: 3}]}>{star}</Text>
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        padding: 15,
        backgroundColor: Colors.primary,
        paddingTop: 0,
      }}>
      <View style={styles.header}>
        <Pressable>
          <IconNotify />
        </Pressable>
        <Logo width={74} height={54} />
        <Pressable
          onPress={() => {
            navigation.navigate('SettingScreen');
          }}>
          <IconSetting />
        </Pressable>
      </View>

      {/* Search View */}
      <View style={styles.searchView}>
        <TextInput
          style={{
            flex: 1,
            ...Regular17,
            color: Colors.button_primary,
            fontSize: 15,
          }}
          placeholder="Search"
          placeholderTextColor={Colors.button_primary}
        />
        <Pressable
          style={{
            width: 43,
            height: 43,
            backgroundColor: '#D9D9D9',
            elevation: 10,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <IconSearch fillColor={Colors.red} />
        </Pressable>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 60}}>
        {/* Newest */}
        <View>
          <Text style={[Heading, {marginTop: 15}]}>Newest</Text>
          {/* Carousel */}
          <View style={{width: '100%', height: 260, marginTop: 15}}>
            <Carousel
              style={styles.carousel}
              renderItem={renderItemNewestFilm}
              itemWidth={200}
              containerWidth={WINDOW_WIDTH - 20}
              separatorWidth={0}
              inActiveOpacity={0.4}
              data={FILM_DATA}
              ref={carousel}
              onScrollEnd={(item, index) => {
                setCurrentFilmSelect(FILM_DATA[index]);
              }}
            />
          </View>
          {/* Info container */}
          <View style={[styles.infoContainer]}>
            <View style={styles.leftContainer}>
              <Text numberOfLines={4} style={[SubHeading]}>
                {currentFilmSelect.name}
              </Text>
              <Text
                numberOfLines={4}
                style={[
                  Regular17,
                  {
                    fontSize: 15,
                    marginTop: 8,
                    textTransform: 'capitalize',
                  },
                ]}>
                {currentFilmSelect.years} -{' '}
                {currentFilmSelect.categories.join('/')}
              </Text>
            </View>
            <Pressable
              style={styles.buttonPlay}
              onPress={() => {
                navigation.navigate('WatchFilmScreen');
              }}>
              <IconPlayOutlineSmall />
            </Pressable>
          </View>
        </View>
        {/* Suggest container */}
        <View style={styles.suggestContainer}>
          <Text style={[Heading]}>Suggest for you</Text>
          <View style={styles.filmContainer}>
            {FILM_DATA.map((item, index) => {
              return (
                <Film
                  key={item._id}
                  data={item}
                  style={styles.filmContainerStyle}
                />
              );
            })}
          </View>
        </View>

        {/* Suggest container */}
        <View style={styles.suggestContainer}>
          <Text style={[Heading]}>Film of season</Text>
          <View style={styles.filmContainer}>
            {FILM_DATA.map((item, index) => {
              return (
                <Film
                  key={item._id}
                  data={item}
                  style={styles.filmContainerStyle}
                />
              );
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchView: {
    backgroundColor: '#fff',
    paddingStart: 20,
    marginBottom: 15,
    borderRadius: 8,
    height: 43,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    overflow: 'hidden',
  },
  itemFilm: {
    width: 180,
    height: 254,
    borderRadius: 13,
  },
  carousel: {
    flex: 1,
    overflow: 'hidden',
  },
  infoContainer: {
    width: '100%',
    marginTop: 25,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  buttonPlay: {
    width: 51,
    height: 51,
    borderRadius: 100,
    backgroundColor: Colors.red_second,
    justifyContent: 'center',
    alignItems: 'center',
    marginStart: 20,
  },
  leftContainer: {
    flex: 8,
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
