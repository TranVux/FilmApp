import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import {Pressable} from 'react-native';
import {IconNotify, IconSearch, IconSetting, Logo} from '../../assets/svgs';
import {Colors} from '../../assets/colors';
import {Heading, Regular17} from '../../assets/typography';
import {SafeAreaView} from 'react-native-safe-area-context';
import Film from '../../components/Film';
import AxiosInstance from '../../utils/AxiosInstance';
import {ActivityIndicator} from 'react-native';
import {Image} from 'react-native';
import {Medium15} from '../../assets/typography';

const SearchResult = ({navigation, route}) => {
  const {query} = route.params;
  const [searchKeyWord, setSearchKeyWord] = React.useState(query);
  const [listFilmSearch, setListFilmSearch] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const handleSearchFilm = async () => {
    setIsLoading(true);
    try {
      const res = await AxiosInstance().get(
        `/film/search?key=${searchKeyWord}`,
      );
      if (!res.error) {
        console.log(res);
        setListFilmSearch(res.data);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const onSearchButtonClick = () => {
    handleSearchFilm();
  };

  React.useEffect(() => {
    handleSearchFilm();
  }, []);

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
          value={searchKeyWord}
          onChangeText={setSearchKeyWord}
          style={{
            flex: 1,
            ...Regular17,
            color: Colors.button_primary,
            fontSize: 15,
          }}
          placeholder="Search"
          placeholderTextColor={Colors.button_primary}
        />
        {isLoading && (
          <ActivityIndicator
            size={'small'}
            color="#ccc"
            style={{
              marginEnd: 5,
            }}
          />
        )}
        <Pressable
          onPress={onSearchButtonClick}
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
      <Text style={[Heading]}>Search Result</Text>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingBottom: 60}}>
        <View style={styles.searchResultContainer}>
          {listFilmSearch.length === 0 && !isLoading && (
            <View>
              <Image
                source={require('../../assets/images/empty_search_result.png')}
                style={{alignSelf: 'center', width: 250, height: 250}}
              />
              <Text style={[Medium15, {alignSelf: 'center'}]}>
                No matching film !!
              </Text>
            </View>
          )}

          <View style={styles.filmContainer}>
            {listFilmSearch.map((item, index) => {
              return (
                <Film
                  data={item}
                  key={item._id}
                  style={styles.filmContainerStyle}
                  onPress={() => {
                    navigation.navigate('FilmDetailSearchScreen', {
                      data: item,
                    });
                  }}
                />
              );
            })}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SearchResult;

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
