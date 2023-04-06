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

const RegisterScreen = ({navigation}) => {
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
          ToastAndroid.show('Register failure!', ToastAndroid.SHORT);
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
