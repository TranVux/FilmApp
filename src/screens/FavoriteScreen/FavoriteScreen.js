import {Pressable, StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {IconNotify, IconSetting, Logo} from '../../assets/svgs';
import {Colors} from '../../assets/colors';
import {RefreshControl, ScrollView} from 'react-native-gesture-handler';
import {Heading, Medium15} from '../../assets/typography';
import Film from '../../components/Film';
import AxiosInstance from '../../utils/AxiosInstance';
import {useDispatch, useSelector} from 'react-redux';
import {addHistoryItem} from '../../redux/slices/filmsHistorySlice';

const FavoriteScreen = ({navigation}) => {
  const [listMyCollection, setListMyCollection] = React.useState([]);
  const [listFilmSuggest, setListFilmSuggest] = React.useState([]);

  const [isLoading, setIsLoading] = React.useState(false);
  const {_id} = useSelector(state => state.dataUser);
  const dispatch = useDispatch();
  const filmHistory = useSelector(state => state.filmHistory);

  const handleGetMyCollection = async () => {
    setIsLoading(true);
    try {
      const res = await AxiosInstance().get(`auth/collections/${_id}`);
      console.log(res);
      if (!res.error) {
        setListMyCollection(res.data);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const handleGetSuggestFilm = async () => {
    try {
      setIsLoading(true);
      const _listFilmSuggest = await AxiosInstance().get('/film/trending');
      console.log(_listFilmSuggest);

      setListFilmSuggest(_listFilmSuggest.data);
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const onRefresh = () => {
    setIsLoading(true);
    handleGetMyCollection();
    handleGetSuggestFilm();
  };

  React.useEffect(() => {
    handleGetSuggestFilm();
    handleGetMyCollection();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.primary,
        padding: 15,
        paddingTop: 0,
        paddingBottom: 70,
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
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={isLoading} />
        }>
        {/* collection list */}
        <View>
          <Text style={[Heading, {marginBottom: 15}]}>My Collection</Text>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal>
            {listMyCollection?.map((item, index) => {
              return (
                <Film
                  data={item}
                  key={item._id}
                  onPress={() => {
                    navigation.navigate('WatchFilmScreen', {
                      data: item,
                      episodeIndex: 0,
                    });
                    if (!filmHistory?.includes(item._id)) {
                      dispatch(addHistoryItem(item._id));
                    }
                  }}
                />
              );
            })}
          </ScrollView>
          {listMyCollection?.length === 0 && !isLoading && (
            <View style={{width: '100%'}}>
              <Image
                source={require('../../assets/images/empty_search_result.png')}
                style={{alignSelf: 'center', width: 200, height: 200}}
              />
              <Text style={[Medium15, {alignSelf: 'center'}]}>
                Don't have anything here !! {':<'}
              </Text>
            </View>
          )}
        </View>
        {/* Suggest container */}
        <Text style={[Heading, {marginTop: 20}]}>Suggest for you</Text>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <View style={styles.suggestContainer}>
            <View style={styles.filmContainer}>
              {listFilmSuggest.map((item, index) => {
                return (
                  <Film
                    data={item}
                    key={item._id}
                    style={styles.filmContainerStyle}
                    onPress={() => {
                      navigation.navigate('FilmDetail', {
                        data: item,
                        episodeIndex: 0,
                      });
                      if (!filmHistory?.includes(item._id)) {
                        dispatch(addHistoryItem(item._id));
                      }
                    }}
                  />
                );
              })}
            </View>
          </View>
        </ScrollView>
      </ScrollView>
    </View>
    // </ScrollView>
  );
};

export default FavoriteScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 15,
  },
  suggestContainer: {
    marginTop: 15,
  },
  filmContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});
