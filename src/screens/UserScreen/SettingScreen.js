import {Pressable, StyleSheet, Text, View} from 'react-native';
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
  SubHeadingRegular,
  SubSmall,
} from '../../assets/typography';
import FastImage from 'react-native-fast-image';
import {useDispatch, useSelector} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {setIsLogin} from '../../redux/slices/isLoginSlice';
import {deleteDataUser, setDataUser} from '../../redux/slices/dataUserSlice';

const SettingScreen = ({navigation}) => {
  const isLogin = useSelector(state => state.isLogin);
  const {name} = useSelector(state => state.dataUser);
  const dispatch = useDispatch();

  const handleLoginLogout = async () => {
    if (isLogin) {
      //logout here
      await AsyncStorage.setItem('isLogin', 'false');
      await AsyncStorage.removeItem('UserData');
      dispatch(setIsLogin(false));
      dispatch(deleteDataUser({}));
    } else {
      navigation.navigate('LoginScreen');
    }
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
              resizeMode={FastImage.resizeMode.contain}
              style={styles.avt}
              source={{
                uri: 'https://scontent.fsgn5-5.fna.fbcdn.net/v/t39.30808-1/185204302_1163620777456081_5636434007978208375_n.jpg?stp=dst-jpg_p160x160&_nc_cat=100&ccb=1-7&_nc_sid=7206a8&_nc_ohc=n5K2_0IVSBQAX_HNcsq&_nc_ht=scontent.fsgn5-5.fna&oh=00_AfCQTIbASnty8f2flBdymwChaOR5y2c4zh0TvA7BxT-Jeg&oe=641AB87B',
              }}
            />

            <View style={{marginStart: 10}}>
              <Text style={[HeadingRegular]}>{name}</Text>
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
          <Pressable style={styles.buttonOption}>
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
});
