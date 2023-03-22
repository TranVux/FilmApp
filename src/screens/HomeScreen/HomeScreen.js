import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Colors} from '../../assets/colors';
import {IconNotify, IconSetting, Logo} from '../../assets/svgs';
import {Heading} from '../../assets/typography';
import TrendingMovie from '../../components/TrendingMovie';
import {CHIP_DATA, DATA, FILM_DATA} from '../../assets/data/FilmData';

import {Chip} from '@rneui/themed';
import {ScrollView} from 'react-native';
import Film from '../../components/Film';

const HomeScreen = ({navigation}) => {
  const [categorySelected, setCategorySelected] = React.useState(0);

  const handleSelectedCategory = index => {
    setCategorySelected(index);
  };

  const renderItemTrending = ({item}) => {
    return (
      <TrendingMovie
        data={item}
        key={item._id}
        onPress={() => {
          navigation.navigate('FilmDetail');
        }}
      />
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.primary,
        padding: 15,
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
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{flexGrow: 1, paddingBottom: 70}}>
        <View style={styles.sectionContainer}>
          <Text style={[Heading]}>Trending movies</Text>

          {/* List contianer */}
          <View style={{marginTop: 15}}>
            <FlatList
              showsVerticalScrollIndicator={false}
              showsHorizontalScrollIndicator={false}
              horizontal={true}
              data={DATA}
              renderItem={renderItemTrending}
              keyExtractor={item => item._id}
              ItemSeparatorComponent={() => <View style={{width: 15}} />}
            />
            {/* <TrendingMovie data={DATA[0]} /> */}
          </View>
          <Text style={[Heading, {marginTop: 30}]}>Categories</Text>
          <ScrollView
            style={styles.categoriesContainer}
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            {CHIP_DATA.map((item, index) => {
              return (
                <Chip
                  containerStyle={{
                    marginHorizontal: 8,
                  }}
                  touchSoundDisabled={true}
                  onPress={() => {
                    handleSelectedCategory(index);
                  }}
                  key={item._id}
                  title={item.name}
                  buttonStyle={[
                    styles.buttonChipTitle,
                    {
                      backgroundColor:
                        categorySelected === index
                          ? Colors.red
                          : Colors.secondary,
                    },
                  ]}
                  titleStyle={styles.chipTitle}
                />
              );
            })}
          </ScrollView>
          {/* List film */}

          <ScrollView showsHorizontalScrollIndicator={false} horizontal>
            {FILM_DATA.map((item, index) => {
              return (
                <Film
                  data={item}
                  key={item._id}
                  style={styles.filmContainerStyle}
                />
              );
            })}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
    // </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 15,
  },
  sectionContainer: {},
  categoriesContainer: {
    marginVertical: 15,
  },
  chipTitle: {
    textAlignVertical: 'center',
    textAlign: 'center',
    fontSize: 13,
    fontFamily: 'extralbold',
    lineHeight: 18,
    paddingHorizontal: 15,
  },
  buttonChipTitle: {
    alignSelf: 'flex-start',
    minWidth: 70,
    height: 32,
    padding: 0,
    rippleColor: Colors.red_second,
  },
  filmContainerStyle: {
    marginEnd: 15,
  },
});
