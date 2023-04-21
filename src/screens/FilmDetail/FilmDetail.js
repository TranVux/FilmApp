import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import React from 'react';
import {Colors} from '../../assets/colors';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import {
  IconBack,
  IconHeart,
  IconHeartFill,
  IconPlayOutlineSmall,
} from '../../assets/svgs';
import {Heading, SubHeadingRegular, TextButton} from '../../assets/typography';
import {Button} from '@rneui/themed';
import YoutubePlayer from '../../components/YoutubePlayer';
import {useDispatch, useSelector} from 'react-redux';
import AxiosInstance from '../../utils/AxiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setDataUser} from '../../redux/slices/dataUserSlice';
import {addHistoryItem} from '../../redux/slices/filmsHistorySlice';
import {useNavigation} from '@react-navigation/native';

const FilmDetail = ({navigation, route}) => {
  const _navigation = useNavigation();
  const {data} = route.params;
  const dispatch = useDispatch();

  const isValueChange = useSelector(state => state.isValueChange);
  const [currentFilm, setCurrentFilm] = React.useState(data);

  //get data from store of redux
  const filmHistory = useSelector(state => state.filmHistory);
  const dataUser = useSelector(state => state.dataUser);
  const [hasInCollection, setHasInCollection] = React.useState(false);
  const [isAdding, setIsAdding] = React.useState(false);

  const handleAddItemCollection = async () => {
    //disabled button hearth when request
    setIsAdding(true);

    if (dataUser?.email) {
      try {
        const res = await AxiosInstance().post('/auth/collections/add/toggle', {
          user_id: dataUser?._id,
          film_id: currentFilm?._id,
        });
        console.log(res);
        if (!res.error) {
          if (res?.data?.collections.length > dataUser?.collections?.length) {
            setHasInCollection(true);
            ToastAndroid.show(
              'Add to collection successfully',
              ToastAndroid.SHORT,
            );
          } else {
            setHasInCollection(false);
            ToastAndroid.show(
              'Remove from collection successfully',
              ToastAndroid.SHORT,
            );
          }

          //update data after add or remove item from collection
          await AsyncStorage.setItem(
            'UserData',
            JSON.stringify({
              ...dataUser,
              collections: res?.data?.collections,
            }),
          );
          dispatch(
            setDataUser({
              ...dataUser,
              collections: res?.data?.collections,
            }),
          );

          //
        } else {
          ToastAndroid.show('Add to collection failure', ToastAndroid.SHORT);
        }
      } catch (error) {
        console.log(error);
        ToastAndroid.show('Add to collection failure', ToastAndroid.SHORT);
      }
    } else {
      ToastAndroid.show(
        'You must login to add this film to collection!!',
        ToastAndroid.SHORT,
      );
    }

    //enabled button hearth when request complete
    setIsAdding(false);
  };

  React.useEffect(() => {
    setHasInCollection(dataUser?.collections?.includes(currentFilm._id));
  }, []);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      nestedScrollEnabled={true}
      contentContainerStyle={{flexGrow: 1, backgroundColor: Colors.primary}}>
      <View style={{flex: 1, paddingBottom: 80}}>
        <FastImage
          source={{
            uri: currentFilm.thumbnail.path,
          }}
          style={styles.thumbnailStyle}
          resizeMode={FastImage.resizeMode.cover}>
          <LinearGradient
            style={styles.desFilmContainer}
            colors={[Colors.primary, '#1A1B4280', Colors.primary]}>
            <View style={styles.header}>
              <Pressable
                onPress={() => {
                  _navigation.goBack();
                }}>
                <IconBack width={27} height={27} />
              </Pressable>
              <Pressable disabled={isAdding} onPress={handleAddItemCollection}>
                {hasInCollection ? <IconHeartFill /> : <IconHeart />}
              </Pressable>
            </View>
            <View
              style={{
                paddingHorizontal: 10,
                justifyContent: 'space-between',
              }}>
              <Text style={[Heading]}>{currentFilm.name}</Text>
              <Text style={[SubHeadingRegular, {color: '#FFFFFFB2'}]}>
                {currentFilm.list_category.map((item, index, data) => {
                  if (index >= data.length - 1) return item.name;
                  return item.name.concat('/');
                })}
              </Text>
              <ScrollView
                nestedScrollEnabled={true}
                style={{maxHeight: 170, marginTop: 10}}>
                <Text style={[SubHeadingRegular]}>{currentFilm.synopsis}</Text>
              </ScrollView>
            </View>
          </LinearGradient>
        </FastImage>
        <Button
          onPress={async () => {
            navigation.navigate('WatchFilmScreen', {
              film_id: currentFilm._id,
              episodeIndex: 0,
            });
            if (!filmHistory?.includes(currentFilm._id)) {
              dispatch(addHistoryItem(currentFilm._id));
            }
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
          <YoutubePlayer
            preventFullScreen={true}
            videoID={currentFilm.trailer}
          />
          {/* <DailymotionVideoPlayer /> */}
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
