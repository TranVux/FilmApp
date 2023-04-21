import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Animated,
} from 'react-native';
import React from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Colors} from '../../assets/colors';
import {
  Display28,
  Medium15,
  Medium18,
  Regular17,
  TextButton,
} from '../../assets/typography';
import InputField from '../../components/InputField';
import {Pressable} from 'react-native';
import {IconFacebook, IconGoogle} from '../../assets/svgs';
import AxiosInstance from '../../utils/AxiosInstance';
import {ToastAndroid} from 'react-native';
import {
  onFacebookButtonPress,
  onGoogleButtonPress,
} from '../../configs/firebase/authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setIsLogin} from '../../redux/slices/isLoginSlice';
import {useDispatch} from 'react-redux';
import {setDataUser} from '../../redux/slices/dataUserSlice';

const RegisterScreen = ({navigation}) => {
  const dispatch = useDispatch();

  const opacityValue = React.useRef(new Animated.Value(0)).current;

  const [dataRegister, setDataRegister] = React.useState({
    email: '',
    password: '',
    username: '',
  });
  const [isLoading, setIsLoading] = React.useState(false);

  const handleAnimationFadeInDialog = () => {
    setIsLoading(true);
    console.log('Animated');
    Animated.timing(opacityValue, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const handleAnimationFadeOutDialog = () => {
    console.log('Animated');
    Animated.timing(opacityValue, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
    setIsLoading(false);
  };

  const handleEmail = text => {
    setDataRegister({...dataRegister, email: text});
  };

  const handlePassword = text => {
    setDataRegister({...dataRegister, password: text});
  };

  const handleUsername = text => {
    setDataRegister({...dataRegister, username: text});
  };

  const handleRegister = async () => {
    if (
      dataRegister.email.length > 0 &&
      dataRegister.password.length > 0 &&
      dataRegister.username.length > 0
    ) {
      try {
        handleAnimationFadeInDialog();
        const res = await AxiosInstance().post('/auth/register', dataRegister);
        if (!res.error) {
          console.log(res.data);
          ToastAndroid.show('Register success!', ToastAndroid.SHORT);
          navigation.navigate('LoginScreen');
        } else {
          if (res.message) {
            ToastAndroid.show(
              'Register failure! '.concat(res.message),
              ToastAndroid.SHORT,
            );
          } else {
            ToastAndroid.show('Register failure!', ToastAndroid.SHORT);
          }
        }
      } catch (e) {
        ToastAndroid.show('Please check your network!', ToastAndroid.SHORT);
        console.log(e);
      }
    } else {
      ToastAndroid.show('Please fill all data!', ToastAndroid.SHORT);
    }
    handleAnimationFadeOutDialog();
  };

  const handleGoogleLogin = () => {
    onGoogleButtonPress()
      .then(user => {
        console.log('Login With Google');
        console.log(user);

        //handle save data
        // JSON.stringify({_id, user_name, image, email, collections}),

        const data = {
          _id: user.user.uid,
          user_name: user.user.displayName,
          image: {
            name: `${user.user.displayName}_${new Date().getTime()}`,
            path: user.user.photoURL,
          },
          email: user.user.email,
        };

        AxiosInstance()
          .post('/auth/login?type=social', data)
          .then(result => {
            // console.log(result);

            handleSaveDataAfterLogin(result);
          })
          .catch(e => {
            console.log(e);
          });
      })
      .catch(e => {
        console.log(e);
      });
  };
  const handleLoginFacebook = () => {
    onFacebookButtonPress()
      .then(user => {
        console.log(user);

        //handle login with facebook
        const data = {
          _id: user.user.uid,
          user_name: user.user.displayName,
          image: {
            name: `${user.user.displayName}_${new Date().getTime()}`,
            path: user.user.photoURL,
          },
          email: user.user.email,
        };

        AxiosInstance()
          .post('/auth/login?type=social', data)
          .then(result => {
            // console.log(result);

            handleSaveDataAfterLogin(result);
          })
          .catch(e => {
            console.log(e);
          });
      })
      .catch(e => {
        console.log(e.code);
        if (e.code === error_duplicate_email) {
          ToastAndroid.show(
            'You has an Google account was connected with app with same email of Facebook account!! We will use Google account for this action',
            ToastAndroid.LONG,
          );
          handleGoogleLogin();
        } else {
          ToastAndroid.show(
            'Has error when use facebook account! Please try again!',
            ToastAndroid.SHORT,
          );
        }
      });
  };

  const handleSaveDataAfterLogin = async res => {
    console.log('Login Success!');
    const {
      _id,
      user_name,
      image,
      email,
      collections,
      social_id = '',
    } = res.data;
    ToastAndroid.show('Login Success!', ToastAndroid.SHORT);

    //handle isLogin
    dispatch(setIsLogin(true));
    await AsyncStorage.setItem(
      'UserData',
      JSON.stringify({
        _id,
        user_name,
        image,
        email,
        collections,
        social_id,
      }),
    );
    await AsyncStorage.setItem('isLogin', 'true');
    dispatch(
      setDataUser({_id, user_name, image, email, collections, social_id}),
    );

    navigation.navigate('BottomNavigator');
  };

  return (
    <KeyboardAwareScrollView
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={{flexGrow: 1, backgroundColor: Colors.primary}}>
      <View style={{flex: 1, padding: 15, paddingVertical: 30, marginTop: 25}}>
        <View style={{flex: 1}}>
          <Text style={[Display28]}>Welcome! ✌️</Text>
          <Text
            style={[Regular17, {marginTop: 5, textTransform: 'capitalize'}]}>
            Enjoy your favorite film every where
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <InputField
            containerStyle={styles.inputField}
            placeholder={'Username'}
            onChangeText={handleUsername}
          />
          <InputField
            containerStyle={styles.inputField}
            placeholder={'Email'}
            onChangeText={handleEmail}
          />
          <InputField
            containerStyle={styles.inputField}
            placeholder={'Password'}
            securePassword
            onChangeText={handlePassword}
          />
          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
            <Text style={[Medium15]}>Already have account? </Text>
            <Pressable
              onPress={() => {
                navigation.navigate('LoginScreen');
              }}>
              <Text style={[Medium15, {textDecorationLine: 'underline'}]}>
                sign in
              </Text>
            </Pressable>
          </View>
        </View>

        <View style={{flex: 8}}>
          <Pressable
            onPress={handleRegister}
            style={[styles.button, {backgroundColor: Colors.red_second}]}>
            <Text style={[TextButton]}>Sign Up</Text>
          </Pressable>
          <Text style={[{alignSelf: 'center', marginVertical: 20}, Medium18]}>
            or
          </Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            {/* Button facebook */}
            <Pressable
              onPress={handleLoginFacebook}
              style={[
                styles.button,
                {backgroundColor: '#fff', flex: 2, marginEnd: 20},
              ]}>
              <IconFacebook style={styles.iconButton} />
            </Pressable>

            {/* Button google */}
            <Pressable
              onPress={handleGoogleLogin}
              style={[styles.button, {backgroundColor: '#fff', flex: 2}]}>
              <IconGoogle style={styles.iconButton} />
            </Pressable>
          </View>
        </View>
      </View>
      {isLoading && (
        <Animated.View style={styles.styleDialog}>
          <View style={styles.dialogBox}>
            <ActivityIndicator size={'large'} color={Colors.red} />
            <Text style={[Medium15, {color: Colors.primary}]}>
              Please wait...
            </Text>
          </View>
        </Animated.View>
      )}
    </KeyboardAwareScrollView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  inputContainer: {
    marginTop: 30,
    flex: 0,
    marginBottom: 60,
  },
  inputField: {
    marginTop: 20,
  },
  button: {
    height: 49,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    flexDirection: 'row',
  },
  iconButton: {},
  styleDialog: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: '#00000060',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 10,
  },
  dialogBox: {
    backgroundColor: '#fff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    gap: 5,
    elevation: 5,
  },
});
