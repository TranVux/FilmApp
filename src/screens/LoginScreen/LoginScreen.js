import {StyleSheet, Text, ToastAndroid, View} from 'react-native';
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

const LoginScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const [dataLogin, setDataLogin] = React.useState({
    email: '',
    password: '',
  });

  const handleChangePassword = text => {
    setDataLogin({...dataLogin, password: text});
  };

  const handleChangeEmail = text => {
    setDataLogin({...dataLogin, email: text});
  };

  const handleLogin = async () => {
    if (dataLogin.email.length > 0 && dataLogin.password.length > 0) {
      try {
        const res = await AxiosInstance().post('/auth/login', {
          email: dataLogin.email,
          password: dataLogin.password,
        });

        if (!res.error) {
          console.log(res);
          console.log('Login Success!');
          const {_id, user_name, image, email} = res.data;
          ToastAndroid.show('Login Success!', ToastAndroid.SHORT);

          //handle isLogin
          dispatch(setIsLogin(true));
          await AsyncStorage.setItem(
            'UserData',
            JSON.stringify({_id, user_name, image, email}),
          );
          await AsyncStorage.setItem('isLogin', 'true');
          dispatch(setDataUser({_id, user_name, image, email}));
          navigation.navigate('BottomNavigator');
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
            style={styles.inputField}
            placeholder={'Email'}
            onChangeText={handleChangeEmail}
          />
          <InputField
            style={styles.inputField}
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
              style={[
                styles.button,
                {backgroundColor: '#fff', flex: 2, marginEnd: 20},
              ]}>
              <IconFacebook style={styles.iconButton} />
            </Pressable>

            {/* Button google */}
            <Pressable
              style={[styles.button, {backgroundColor: '#fff', flex: 2}]}>
              <IconGoogle style={styles.iconButton} />
            </Pressable>
          </View>
        </View>
      </View>
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
});
