import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
  BackHandler,
} from 'react-native';
import React from 'react';
import {Colors} from '../../assets/colors';
import {Heading, Medium, SubHeading, SubSmall} from '../../assets/typography';
import {
  IconDownload,
  IconLike,
  IconLikeFill,
  IconShare,
  IconView,
} from '../../assets/svgs';
import ButtonVerticalIcon from '../../components/ButtonVerticalIcon';
import Film from '../../components/Film';
import AxiosInstance from '../../utils/AxiosInstance';
import {RefreshControl} from 'react-native-gesture-handler';
import DailymotionVideoPlayer from '../../components/DailymotionVideoPlayer';
import {useDispatch, useSelector} from 'react-redux';
import {addHistoryItem} from '../../redux/slices/filmsHistorySlice';
import {setValue} from '../../redux/slices/isValueChange';
import {useFocusEffect} from '@react-navigation/native';
import {Skeleton} from '@rneui/themed';

const WatchFilmScreen = ({navigation, route}) => {
  const {film_id, episodeIndex} = route.params;

  const dispatch = useDispatch();
  const filmHistory = useSelector(state => state.filmHistory);
  const isLogin = useSelector(state => state.isLogin);
  const {_id} = useSelector(state => state.dataUser);

  const scrollViewRef = React.useRef();

  const [currentEpisodeIndex, setCurrentEpisodeIndex] =
    React.useState(episodeIndex);
  const [currentFilm, setCurrentFilm] = React.useState(undefined);

  const [listFilmSuggest, setListFilmSuggest] = React.useState([]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);

  //handle like for film
  const [like, setLike] = React.useState({
    initStatus: currentFilm?.like?.liked.includes(_id),
    amount: currentFilm?.like?.liked.length,
    status: currentFilm?.like?.liked.includes(_id),
  });
  //end handle like

  const handleGetSuggestFilm = async () => {
    const list_categories = currentFilm?.list_category?.map(item => {
      return item.name;
    });

    console.log(list_categories);
    try {
      const _listFilmSuggest = await AxiosInstance().post('/film/categories', {
        list_categories,
      });
      console.log(_listFilmSuggest);

      setListFilmSuggest(_listFilmSuggest.data);
    } catch (error) {
      console.log(error);
    }
  };

  const onChangeFilmEpisode = index => {
    setCurrentEpisodeIndex(index);
  };

  const onRefresh = () => {
    setRefreshing(false);
  };

  const onFilmItemClick = item => {
    handleSetCurrentFilm(item);

    // handleGetSuggestFilm();

    //add film to history list
    if (!filmHistory?.includes(item._id)) {
      dispatch(addHistoryItem(item._id));
    }

    scrollViewRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };

  const handleChangeCurrentFilm = async _id_film => {
    setRefreshing(true);
    try {
      const res = await AxiosInstance().get(`/film/${_id_film}/detail`);
      // console.log(res);
      if (!res.error) {
        handleSetCurrentFilm(res.data);
      } else {
        console.log('Film Id invalid');
      }
    } catch (error) {
      console.log(error);
    }
    setRefreshing(false);
  };

  const handleSetCurrentFilm = film => {
    //handle update like amount for film
    handleUpdateLikeAmount(like);
    //end handle update like amount for film

    setCurrentFilm(film);

    //sort list episode by index properties
    currentFilm?.list_episode?.sort(
      (a, b) => Number(a?.index) - Number(b?.index),
    );
  };

  const handleUpdateLikeAmount = async stateLike => {
    console.log(stateLike);
    try {
      if (isLogin) {
        if (stateLike.initStatus !== stateLike.status) {
          const res = await AxiosInstance().post(
            `/film/like/${currentFilm._id}/${_id}`,
          );

          console.log(res);
        }
      }
    } catch (error) {
      console.log('handleUpdateLikeAmount: ' + error);
    }
  };

  const getCurrentFilm = async () => {
    try {
      console.log('get init data for film');
      const res = await AxiosInstance().get(`/film/${film_id}/detail`);
      console.log(res);
      if (!res.error) {
        setCurrentFilm(res.data);
        setIsLoading(false);
        // console.log('get suggest film!');
        // handleGetSuggestFilm();
        //update successfully
      }
    } catch (error) {
      console.log('updateCurrentFilm: ' + error);
    }
  };

  React.useEffect(() => {
    //handle set new data for like state
    setLike({
      initStatus: currentFilm?.like?.liked.includes(_id),
      amount: currentFilm?.like?.liked.length,
      status: currentFilm?.like?.liked.includes(_id),
    });

    handleGetSuggestFilm();
  }, [currentFilm]);

  React.useEffect(() => {
    //handle get suggest film for user

    //sort list episode by index for init film data
    currentFilm?.list_episode?.sort(
      (a, b) => Number(a?.index) - Number(b?.index),
    );

    console.log(currentFilm);

    //get init value for film
    getCurrentFilm();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        () => {
          console.log('handle on back press');
          console.log(like);
          handleUpdateLikeAmount(like);
          return false;
        },
      );

      return () => subscription.remove();
    }, [currentFilm, like]),
  );

  return (
    <SafeAreaView style={{backgroundColor: Colors.primary, flex: 1}}>
      {/* <YoutubePlayer
        videoID={currentFilm.list_episode[currentEpisodeIndex].video_id}
      /> */}
      <View style={{width: '100%', aspectRatio: 16 / 9}}>
        <DailymotionVideoPlayer
          videoID={
            currentFilm
              ? currentFilm?.list_episode[currentEpisodeIndex]?.video_id
              : ''
          }
        />
      </View>
      <ScrollView
        nestedScrollEnabled={true}
        showsVerticalScrollIndicator={false}
        ref={scrollViewRef}
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: Colors.primary,
        }}
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={refreshing} />
        }>
        <View style={styles.contentContainer}>
          <View style={{marginTop: 20}}>
            {!isLoading ? (
              <Text style={[SubHeading]}>
                {currentFilm?.list_episode[currentEpisodeIndex]?.name}
              </Text>
            ) : (
              <Skeleton
                height={25}
                animation="none"
                style={{
                  backgroundColor: Colors.secondary,
                }}
              />
            )}
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 8,
              }}>
              <IconView />
              <Text style={[SubSmall, {marginStart: 3}]}>
                {currentFilm?.views ? currentFilm.views : '0'}
              </Text>
            </View>
          </View>

          {/* action container */}
          <View style={styles.actionContainer}>
            <Pressable
              style={{alignItems: 'center'}}
              onPress={() => {
                setLike(prev => ({
                  ...prev,
                  amount: prev.status ? prev.amount - 1 : prev.amount + 1,
                  status: !prev.status,
                }));
              }}>
              <IconLike fillColor={like.status ? Colors.red : '#fff'} />
              <Text style={[SubSmall, {marginTop: 3}]}>{like.amount ?? 0}</Text>
            </Pressable>

            <ButtonVerticalIcon
              onPress={() => {
                ToastAndroid.show(
                  'The function is currently in development!!',
                  ToastAndroid.SHORT,
                );
              }}
              title={'Download'}>
              <IconDownload />
            </ButtonVerticalIcon>

            <ButtonVerticalIcon
              onPress={() => {
                ToastAndroid.show(
                  'The function is currently in development!!',
                  ToastAndroid.SHORT,
                );
              }}
              title={'Share'}>
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
            {!isLoading ? (
              <ScrollView
                horizontal={true}
                nestedScrollEnabled={true}
                showsHorizontalScrollIndicator={false}>
                <View style={styles.episodeContainer}>
                  {currentFilm?.list_episode?.map((item, index) => (
                    <Pressable
                      onPress={() => {
                        onChangeFilmEpisode(index);
                      }}
                      key={item._id}
                      style={[
                        styles.episode,
                        {
                          backgroundColor: Colors.secondary,
                          borderColor:
                            currentEpisodeIndex === index
                              ? 'white'
                              : Colors.secondary,
                        },
                      ]}>
                      <Text style={Medium}>{item.index}</Text>
                    </Pressable>
                  ))}
                </View>
              </ScrollView>
            ) : (
              <Skeleton
                height={50}
                animation="none"
                style={{
                  backgroundColor: Colors.secondary,
                  marginTop: 10,
                }}
              />
            )}
            {!isLoading ? (
              <ScrollView
                horizontal
                nestedScrollEnabled={true}
                showsHorizontalScrollIndicator={false}>
                <View style={styles.relativeFilmContainer}>
                  {currentFilm?._id_collection?.films?.map(item => (
                    <Pressable
                      key={item._id}
                      onPress={() => {
                        if (currentFilm.name !== item.name && !refreshing) {
                          handleChangeCurrentFilm(item._id);
                        }
                      }}
                      style={[
                        styles.relativeFilmItem,
                        {
                          borderColor:
                            item.name === currentFilm.name
                              ? 'white'
                              : Colors.secondary,
                        },
                      ]}>
                      <Text style={[Medium, {fontSize: 10}]}>{item.name}</Text>
                    </Pressable>
                  ))}
                </View>
              </ScrollView>
            ) : (
              <Skeleton
                height={20}
                width={'50%'}
                animation="none"
                style={{
                  backgroundColor: Colors.secondary,
                  marginTop: 10,
                }}
              />
            )}
          </View>

          {/* Suggest container */}
          <View style={styles.suggestContainer}>
            <Text style={[Heading]}>Suggest for you</Text>
            <View style={styles.filmContainer}>
              {listFilmSuggest.map((item, index) => {
                return (
                  <Film
                    data={item}
                    key={item._id}
                    style={styles.filmContainerStyle}
                    onPress={() => {
                      onFilmItemClick(item);
                    }}
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
    borderWidth: 0.5,
  },
  relativeFilmContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: 15,
  },
  relativeFilmItem: {
    borderWidth: 0.5,
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
