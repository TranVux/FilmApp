import {FlatList, Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../../assets/colors';
import {IconNotify, IconSetting, Logo} from '../../assets/svgs';
import {Heading} from '../../assets/typography';
import TrendingMovie from '../../components/TrendingMovie';

import {Chip} from '@rneui/themed';
import {ScrollView} from 'react-native';
import Film from '../../components/Film';

import AxiosInstance from '../../utils/AxiosInstance';
import {RefreshControl} from 'react-native-gesture-handler';

const HomeScreen = ({navigation}) => {
  const [categorySelected, setCategorySelected] = React.useState({
    index: 0,
    data: {},
  });
  const [listFilmCategory, setListFilmCategory] = React.useState([]);
  const [listCategory, setListCategory] = React.useState([]);
  const [trendingMovieList, setTrendingMovieList] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);

  const handelGetCategory = async () => {
    try {
      const _listCategory = await AxiosInstance().get('/categories');
      _listCategory.data.splice(0, 0, {_id: '25546484611311684', name: 'All'});

      setListCategory(_listCategory.data);
      handleSelectedCategory(0, _listCategory.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetTrendingMovie = async () => {
    try {
      const _listTrendingMovie = await AxiosInstance().get('/film/trending');
      setTrendingMovieList(_listTrendingMovie.data);
      // console.log(_listTrendingMovie.data);
    } catch (error) {
      console.log(error);
    }

    //handle swipe to refresh
    setRefreshing(false);
  };

  const handleGetFilmByCategory = async () => {
    try {
      //handle swipe to refresh
      setRefreshing(true);
      let list_categories = [];
      if (categorySelected.data.name === 'All') {
        list_categories = listCategory.map(item => item.name);
      } else {
        list_categories.push(categorySelected.data.name);
      }
      // console.log(list_categories);

      const _listFilmCategory = await AxiosInstance().post('/film/categories', {
        list_categories,
      });
      setListFilmCategory(_listFilmCategory.data);
    } catch (error) {
      console.log(error);
    }

    //handle swipe to refresh
    setRefreshing(false);
  };

  React.useEffect(() => {
    //get list category
    handelGetCategory();

    //get list trending film
    handleGetTrendingMovie();
  }, []);

  React.useEffect(() => {
    //get list film by category
    handleGetFilmByCategory();
  }, [categorySelected]);

  const handleSelectedCategory = (index, data) => {
    setCategorySelected(prev => ({...prev, index, data}));
  };

  const renderItemTrending = ({item}) => {
    return (
      <TrendingMovie
        data={item}
        key={item._id}
        onPress={() => {
          navigation.navigate('FilmDetail', {data: item});
        }}
      />
    );
  };

  //handle swipe to refresh
  const onRefresh = () => {
    setRefreshing(true);
    handleGetTrendingMovie();
    handelGetCategory();
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
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }
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
              data={trendingMovieList}
              renderItem={renderItemTrending}
              keyExtractor={item => item._id}
              ItemSeparatorComponent={() => <View style={{width: 15}} />}
            />
          </View>
          <Text style={[Heading, {marginTop: 30}]}>Categories</Text>
          <ScrollView
            style={styles.categoriesContainer}
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            {listCategory.map((item, index) => {
              return (
                <Chip
                  containerStyle={{
                    marginHorizontal: 8,
                  }}
                  touchSoundDisabled={true}
                  onPress={() => {
                    handleSelectedCategory(index, item);
                  }}
                  key={item._id}
                  title={item.name}
                  buttonStyle={[
                    styles.buttonChipTitle,
                    {
                      backgroundColor:
                        categorySelected.index === index
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
            {listFilmCategory.map((item, index) => {
              return (
                <Film
                  data={item}
                  key={item._id}
                  style={styles.filmContainerStyle}
                  onPress={() => {
                    navigation.navigate('FilmDetail', {data: item});
                  }}
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
