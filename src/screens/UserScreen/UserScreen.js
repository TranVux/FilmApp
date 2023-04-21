import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  ToastAndroid,
  View,
} from 'react-native';
import React from 'react';
import {Colors} from '../../assets/colors';
import {
  Heading,
  HeadingRegular,
  Medium15,
  Medium18,
  SubHeading,
} from '../../assets/typography';
import {IconEditor, IconSetting} from '../../assets/svgs';
import {Pressable} from 'react-native';
import FastImage from 'react-native-fast-image';
import Film from '../../components/Film';
import {RefreshControl, ScrollView} from 'react-native-gesture-handler';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {useDispatch, useSelector} from 'react-redux';
import Dialog from 'react-native-dialog';
import AxiosInstance from '../../utils/AxiosInstance';
import {setDataUser} from '../../redux/slices/dataUserSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserScreen = ({navigation}) => {
  const isLogin = useSelector(state => state.isLogin);
  const dispatch = useDispatch();
  const filmHistory = useSelector(state => state.filmHistory);
  const dataUser = useSelector(state => state.dataUser);

  const [listFilmHistory, setFilmHistory] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [uriImage, setUriImage] = React.useState('');
  const [dialogDisplay, setDialogDisplay] = React.useState(false);
  const [isUploading, setIsUploading] = React.useState(false);

  const handleUploadImage = async () => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('user_id', dataUser._id);
      formData.append('image', {
        uri: uriImage,
        type: 'image/jpeg',
        name: 'image.jpg',
      });
      const result = await AxiosInstance('multipart/form-data').post(
        '/auth/update_image',
        formData,
      );

      if (!result.error) {
        console.log(result);
        let actionSetDataUser = setDataUser({
          ...dataUser,
          image: result.data.image,
        });
        dispatch(actionSetDataUser);
        await AsyncStorage.setItem(
          'UserData',
          JSON.stringify({
            ...dataUser,
            image: result.data.image,
          }),
        );

        setDialogDisplay(false);
        ToastAndroid.show(
          'Upload profile image successfully!',
          ToastAndroid.SHORT,
        );
      }
    } catch (error) {
      console.log(error);
      ToastAndroid.show(
        'Upload profile image failure!. Try again!!!!',
        ToastAndroid.SHORT,
      );
    }
    setIsUploading(false);
  };

  const handleUriImage = async type => {
    let options = {
      storageOptions: {
        path: 'images',
        mediaType: 'photo',
      },
      includeBase64: true,
    };

    let res;
    switch (type) {
      case 'Camera': {
        res = await launchCamera(options);
        break;
      }
      case 'Gallery': {
        res = await launchImageLibrary(options);
        break;
      }
      default:
        throw new Error('Invalid type ');
    }

    console.log(res);
    if (res.didCancel) {
      console.log(res);
    } else if (res.errorCode === 'camera_unavailable') {
      ToastAndroid.show('Camera not available!');
    } else if (res.errorCode === 'permission') {
      ToastAndroid.show("Haven't permission access camera");
    } else if (res.errorCode === 'others') {
      console.log(res.errorMessage);
    } else {
      setUriImage(res.assets[0].uri);
      console.log(res.assets[0].uri);
      // console.log(uriImage);
      handleUploadImage();
    }
  };

  const handleGetFilmInHistory = async () => {
    setIsLoading(true);
    if (filmHistory?.length > 0) {
      console.log(filmHistory);
      try {
        const res = await AxiosInstance().post('/film/in-array', {
          list_film: filmHistory,
        });
        console.log(res);
        if (!res.error) {
          setFilmHistory(res.data);
        }
      } catch (error) {
        console.log(error);
      }
    }
    setIsLoading(false);
  };

  const onRefresh = () => {
    handleGetFilmInHistory();
  };

  React.useEffect(() => {
    handleGetFilmInHistory();
  }, [dataUser?.filmHistory]);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{flexGrow: 1, backgroundColor: Colors.primary}}
      refreshControl={
        <RefreshControl onRefresh={onRefresh} refreshing={isLoading} />
      }>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: Colors.primary,
          padding: 15,
          paddingBottom: 70,
        }}>
        <View
          style={[
            styles.header,
            {justifyContent: isLogin ? 'space-between' : 'center'},
          ]}>
          {isLogin && <View style={{width: 27}} />}
          <Text style={[Heading]}>Profile</Text>
          {isLogin && (
            <Pressable
              onPress={() => {
                navigation.navigate('SettingScreen');
              }}>
              <IconSetting />
            </Pressable>
          )}
        </View>

        {/* Avt container */}
        <View style={{alignItems: 'center', marginTop: 28}}>
          {isLogin ? (
            <>
              <View>
                <FastImage
                  resizeMode={FastImage.resizeMode.cover}
                  style={styles.avt}
                  source={{
                    uri:
                      dataUser?.image?.path ??
                      'https://firebasestorage.googleapis.com/v0/b/project1-group3-52e2e.appspot.com/o/Images%2Ffallback_image.png?alt=media&token=3cc7a438-0331-4730-95ad-5b932d86e117',
                  }}
                />
                <Pressable
                  style={styles.buttonEdit}
                  onPress={() => {
                    setDialogDisplay(true);
                  }}>
                  <IconEditor width={15} height={15} />
                </Pressable>
              </View>
              <Text style={[HeadingRegular, {marginTop: 5}]}>
                {dataUser?.user_name}
              </Text>
            </>
          ) : (
            <>
              <View
                style={{
                  width: 90,
                  height: 90,
                  borderRadius: 100,
                  backgroundColor: Colors.secondary,
                  elevation: 5,
                }}
              />

              <Pressable
                style={styles.buttonLogin}
                onPress={() => {
                  navigation.navigate('LoginScreen');
                }}>
                <Text style={[SubHeading, {}]}>Login</Text>
              </Pressable>
            </>
          )}
        </View>

        {/*List History */}
        <View>
          <View>
            <Text style={[Heading, {marginVertical: 15}]}>History</Text>
            <ScrollView showsHorizontalScrollIndicator={false} horizontal>
              {listFilmHistory?.map((item, index) => {
                return (
                  <Film
                    data={item}
                    key={item._id}
                    style={styles.filmContainerStyle}
                    onPress={() => {
                      navigation.navigate('WatchFilmScreen', {
                        film_id: item._id,
                        episodeIndex: 0,
                      });
                    }}
                  />
                );
              })}
            </ScrollView>
            {listFilmHistory?.length === 0 && !isLoading && (
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
        </View>
        {/*End List History */}
      </SafeAreaView>

      {/* Dialog update profile image */}
      <Dialog.Container
        useNativeDriver="true"
        onBackdropPress={() => {
          setDialogDisplay(false);
        }}
        visible={dialogDisplay}>
        <Dialog.Title style={[Medium18, {color: Colors.primary}]}>
          Change Profile Image
        </Dialog.Title>
        {!isUploading ? (
          <View>
            <Pressable
              onPress={() => {
                handleUriImage('Camera');
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingStart: 30,
              }}>
              <FastImage
                source={require('../../assets/images/camera.png')}
                style={{width: 50, height: 50, marginEnd: 15}}
              />
              <Text style={[Medium15, {color: Colors.primary}]}>Camera</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                handleUriImage('Gallery');
              }}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingStart: 30,
              }}>
              <FastImage
                source={require('../../assets/images/gallery.png')}
                style={{width: 50, height: 50, marginEnd: 15}}
              />
              <Text style={[Medium15, {color: Colors.primary}]}>Gallery</Text>
            </Pressable>
          </View>
        ) : (
          <View>
            <ActivityIndicator size={'large'} color={Colors.red_second} />
          </View>
        )}

        <Dialog.Button
          disabled={isUploading}
          label="Cancel"
          style={[Medium15, {color: Colors.red, textTransform: 'capitalize'}]}
          onPress={() => {
            setDialogDisplay(false);
          }}
        />
      </Dialog.Container>
    </ScrollView>
  );
};

export default UserScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
  },
  avt: {
    width: 90,
    aspectRatio: 1,
    borderRadius: 50,
  },
  buttonEdit: {
    width: 23,
    height: 23,
    borderRadius: 50,
    backgroundColor: Colors.secondary,
    position: 'absolute',
    bottom: 0,
    right: 0,
    zIndex: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonLogin: {
    marginTop: 15,
    backgroundColor: Colors.red,
    paddingVertical: 5,
    paddingHorizontal: 25,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
});
