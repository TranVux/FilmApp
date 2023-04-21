import {Pressable, StyleSheet, Text, ToastAndroid, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native';
import {Colors} from '../../assets/colors';
import {
  IconBack,
  IconChangePass,
  IconLogin,
  IconLogout,
} from '../../assets/svgs';
import {
  Heading,
  HeadingRegular,
  Medium15,
  SubHeadingRegular,
  SubSmall,
} from '../../assets/typography';
import FastImage from 'react-native-fast-image';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setIsLogin} from '../../redux/slices/isLoginSlice';
import {deleteDataUser} from '../../redux/slices/dataUserSlice';
import AxiosInstance from '../../utils/AxiosInstance';
import {BottomSheet} from '@rneui/themed';
import InputField from '../../components/InputField';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {ActivityIndicator} from 'react-native';
import {clearAllHistory} from '../../redux/slices/filmsHistorySlice';
import auth from '@react-native-firebase/auth';

const SettingScreen = ({navigation}) => {
  const isLogin = useSelector(state => state.isLogin);
  const {user_name, image, _id} = useSelector(state => state.dataUser);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = React.useState(false);
  const [bottomSheetVisible, setBottomSheetVisible] = React.useState(false);
  const [password, setPassword] = React.useState({
    oldPassword: '',
    newPassword: '',
  });

  const handleLoginLogout = async () => {
    if (isLogin) {
      //logout here
      if (auth().currentUser != null) {
        auth()
          .signOut()
          .then(() => {
            console.log('google sign out successfully!');
          });
      }

      await AsyncStorage.setItem('isLogin', 'false');
      await AsyncStorage.removeItem('UserData');
      dispatch(setIsLogin(false));
      dispatch(deleteDataUser({}));
      dispatch(clearAllHistory());
    } else {
      navigation.navigate('LoginScreen');
    }
  };

  const handleChangePassword = async () => {
    setIsLoading(true);
    if (password.newPassword.length <= 0 || password.oldPassword.length <= 0) {
      ToastAndroid.show(
        'Please fill old password field and new password field',
        ToastAndroid.SHORT,
      );
    } else {
      try {
        const res = await AxiosInstance().post('/auth/change_password', {
          user_id: _id,
          oldPassword: password.oldPassword,
          newPassword: password.newPassword,
        });
        if (!res.error) {
          if (res.result) {
            ToastAndroid.show(
              'Change password successfully!!',
              ToastAndroid.SHORT,
            );
            setBottomSheetVisible(false);
          } else {
            ToastAndroid.show('Change password failure!!', ToastAndroid.SHORT);
          }
        } else {
          ToastAndroid.show('Change password failure!!', ToastAndroid.SHORT);
        }
      } catch (error) {
        ToastAndroid.show('Change password successfully!!', ToastAndroid.SHORT);
        console.log(error);
      }
    }
    setIsLoading(false);
  };

  const handleOldPassword = value => {
    setPassword(prev => ({...prev, oldPassword: value}));
  };

  const handleNewPassword = value => {
    setPassword(prev => ({...prev, newPassword: value}));
  };

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: Colors.primary, padding: 15}}>
      <View style={styles.header}>
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}>
          <IconBack />
        </Pressable>
        <Text style={[Heading]}>Setting</Text>
        <View style={{width: 27, height: 27}} />
      </View>
      {isLogin && (
        <View style={styles.cardInfo}>
          <View style={styles.leftContent}>
            <FastImage
              resizeMode={FastImage.resizeMode.cover}
              style={styles.avt}
              source={{
                uri:
                  image?.path ??
                  'https://firebasestorage.googleapis.com/v0/b/project1-group3-52e2e.appspot.com/o/Images%2Ffallback_image.png?alt=media&token=3cc7a438-0331-4730-95ad-5b932d86e117',
              }}
            />

            <View style={{marginStart: 10}}>
              <Text style={[HeadingRegular]}>{user_name}</Text>
              <Pressable>
                <Text style={[SubSmall, {color: '#FFFFFFB2'}]}>
                  Edit profile
                </Text>
              </Pressable>
            </View>
          </View>
          <View style={styles.iconStyle}>
            <IconBack width={23} height={23} fillColor="#FFFFFF80" />
          </View>
        </View>
      )}
      <View style={{marginTop: 30}}>
        {isLogin && (
          <Pressable
            style={styles.buttonOption}
            onPress={() => {
              if (auth().currentUser != null) {
                ToastAndroid.show(
                  'You can not change password for Google Account here!',
                  ToastAndroid.SHORT,
                );
              } else {
                setBottomSheetVisible(true);
              }
            }}>
            <View style={styles.optionLeftContainer}>
              <View style={styles.wrapperIcon}>
                <IconChangePass />
              </View>
              <Text style={[SubHeadingRegular, {marginStart: 10}]}>
                Change password
              </Text>
            </View>
            <View style={styles.iconStyle}>
              <IconBack width={15} height={15} fillColor="#FFFFFF80" />
            </View>
          </Pressable>
        )}
        <Pressable style={styles.buttonOption} onPress={handleLoginLogout}>
          <View style={styles.optionLeftContainer}>
            <View style={styles.wrapperIcon}>
              {isLogin ? <IconLogout /> : <IconLogin />}
            </View>
            <Text style={[SubHeadingRegular, {marginStart: 10}]}>
              {isLogin ? 'Logout' : 'Login'}
            </Text>
          </View>
          <View style={styles.iconStyle}>
            <IconBack width={15} height={15} fillColor="#FFFFFF80" />
          </View>
        </Pressable>
      </View>

      <BottomSheet
        backdropStyle={{backgroundColor: '#00000060'}}
        isVisible={bottomSheetVisible}
        onBackdropPress={() => {
          if (!isLoading) {
            setBottomSheetVisible(false);
          }
        }}>
        <KeyboardAwareScrollView
          style={{flexGrow: 1}}
          keyboardShouldPersistTaps="handled">
          <View style={styles.bottomSheetContainer}>
            <Pressable
              onPress={() => {
                if (!isLoading) {
                  setBottomSheetVisible(false);
                }
              }}
              style={{
                alignItems: 'center',
                width: 30,
                height: 5,
                borderRadius: 50,
                backgroundColor: Colors.secondary,
                marginTop: 15,
                marginBottom: 25,
              }}
            />

            <InputField
              containerStyle={{...styles.inputField, marginTop: 0}}
              textInputStyle={styles.textInputStyle}
              placeholder={'Old Password'}
              securePassword
              onChangeText={handleOldPassword}
            />
            <InputField
              textInputStyle={styles.textInputStyle}
              containerStyle={styles.inputField}
              placeholder={'New Password'}
              securePassword
              onChangeText={handleNewPassword}
            />

            <Pressable
              onPress={handleChangePassword}
              style={styles.buttonChangePassword}>
              {isLoading ? (
                <ActivityIndicator size={'large'} color={'#fff'} />
              ) : (
                <Text style={[Medium15]}>Change Password</Text>
              )}
            </Pressable>
          </View>
        </KeyboardAwareScrollView>
      </BottomSheet>
    </SafeAreaView>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  cardInfo: {
    width: '100%',
    height: 75,
    backgroundColor: Colors.secondary,
    borderRadius: 100,
    marginTop: 35,
    padding: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  avt: {
    width: 55,
    height: 55,
    borderRadius: 100,
  },
  leftContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  iconStyle: {
    transform: [{rotate: '180deg'}],
  },

  buttonOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  optionLeftContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  wrapperIcon: {
    width: 53,
    height: 53,
    borderRadius: 100,
    backgroundColor: Colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputField: {
    marginTop: 20,
    borderColor: Colors.secondary,
    borderWidth: 1,
  },
  textInputStyle: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: Colors.secondary,
  },
  bottomSheetContainer: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    width: '100%',
    paddingHorizontal: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 30,
  },

  buttonChangePassword: {
    backgroundColor: Colors.secondary,
    width: '100%',
    height: 50,
    marginHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
    borderRadius: 100,
  },
});
