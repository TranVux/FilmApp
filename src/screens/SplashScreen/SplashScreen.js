import {View} from 'react-native';
import React, {useEffect} from 'react';
import {Logo} from '../../assets/svgs';
import {Colors} from '../../assets/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useDispatch} from 'react-redux';
import {setIsLogin} from '../../redux/slices/isLoginSlice';
import {deleteDataUser, setDataUser} from '../../redux/slices/dataUserSlice';
import {setHistoryData} from '../../redux/slices/filmsHistorySlice';

const SplashScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const handleFirstData = async () => {
    try {
      const isLogin = await AsyncStorage.getItem('isLogin');
      dispatch(setIsLogin(isLogin == 'true' ? true : false));

      const dataUser = await AsyncStorage.getItem('UserData');
      if (JSON.parse(dataUser)) {
        dispatch(setDataUser(JSON.parse(dataUser)));
      } else {
        dispatch(deleteDataUser());
      }

      const filmHistory = await AsyncStorage.getItem('FilmHistory');
      console.log(filmHistory);
      if (filmHistory) {
        dispatch(setHistoryData(JSON.parse(filmHistory)));
      }
      // console.log('HandleFirstData: ' + isLogin);
      navigation.navigate('BottomNavigator');
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    handleFirstData();
  }, []);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary,
      }}>
      <Logo width={104} height={84} />
    </View>
  );
};

export default SplashScreen;
