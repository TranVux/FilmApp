import {StyleSheet, Text, ToastAndroid, View, Animated} from 'react-native';
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
import {useDispatch, useSelector} from 'react-redux';
import {setIsLogin} from '../../redux/slices/isLoginSlice';
import AxiosInstance from '../../utils/AxiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setDataUser} from '../../redux/slices/dataUserSlice';
import {ActivityIndicator} from 'react-native';
import {onGoogleButtonPress} from '../../configs/firebase/authentication';

const LoginScreen = ({navigation}) => {
  const opacityValue = React.useRef(new Animated.Value(0)).current;

  const dispatch = useDispatch();
  const [dataLogin, setDataLogin] = React.useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = React.useState(false);

  const handleChangePassword = text => {
    setDataLogin({...dataLogin, password: text});
  };

  const handleChangeEmail = text => {
    setDataLogin({...dataLogin, email: text});
  };

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

  const handleLogin = async () => {
    handleAnimationFadeInDialog();
    if (dataLogin.email.length > 0 && dataLogin.password.length > 0) {
      try {
        const res = await AxiosInstance().post('/auth/login', {
          email: dataLogin.email,
          password: dataLogin.password,
        });

        if (!res.error) {
          console.log(res);

          handleSaveDataAfterLogin(res);
        } else {
          console.log(res);
          ToastAndroid.show(
            'Login Failure! Please check password and email again!',
            ToastAndroid.SHORT,
          );
        }
      } catch (err) {
        console.log(err);
        ToastAndroid.show(
          'Login Failure! Please check your network!',
          ToastAndroid.SHORT,
        );
      }
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
            console.log(result);

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
          <Text style={[Display28]}>Welcome Back! ✌️</Text>
          <Text
            style={[Regular17, {marginTop: 5, textTransform: 'capitalize'}]}>
            Enjoy your favorite film every where
          </Text>
        </View>

        <View style={styles.inputContainer}>
          <InputField
            containerStyle={styles.inputField}
            placeholder={'Email'}
            onChangeText={handleChangeEmail}
          />
          <InputField
            containerStyle={styles.inputField}
            placeholder={'Password'}
            securePassword
            onChangeText={handleChangePassword}
          />
          <View
            style={{flexDirection: 'row', alignItems: 'center', marginTop: 10}}>
            <Text style={[Medium15]}>Don’t have account? </Text>
            <Pressable
              onPress={() => {
                navigation.navigate('RegisterScreen');
              }}>
              <Text
                style={[
                  Medium15,
                  {
                    textDecorationLine: 'underline',
                    textAlignVertical: 'center',
                  },
                ]}>
                sign up
              </Text>
            </Pressable>
          </View>
        </View>

        <View style={{flex: 8}}>
          <Pressable
            onPress={handleLogin}
            style={[styles.button, {backgroundColor: Colors.red_second}]}>
            <Text style={[TextButton]}>Sign In</Text>
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
              onPress={() => {
                ToastAndroid.show(
                  "Login with Facebook isn't available",
                  ToastAndroid.SHORT,
                );
              }}
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
        <Animated.View
          style={[
            styles.styleDialog,
            {
              opacity: opacityValue,
            },
          ]}>
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

export default LoginScreen;

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
    // marginHorizontal: 30,
    height: 51,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    flexDirection: 'row',
  },
  iconButton: {
    // position: 'absolute',
    // start: 20,
  },
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
