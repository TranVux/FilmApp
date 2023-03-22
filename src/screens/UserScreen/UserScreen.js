import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Colors} from '../../assets/colors';
import {Heading, HeadingRegular, SubHeading} from '../../assets/typography';
import {IconEditor, IconSetting} from '../../assets/svgs';
import {Pressable} from 'react-native';
import FastImage from 'react-native-fast-image';
import Film from '../../components/Film';
import {FILM_DATA} from '../../assets/data/FilmData';
import {ScrollView} from 'react-native-gesture-handler';
import {useSelector} from 'react-redux';

const UserScreen = ({navigation}) => {
  const isLogin = useSelector(state => state.isLogin);
  const {name} = useSelector(state => state.dataUser);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{flexGrow: 1, backgroundColor: Colors.primary}}>
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
                  resizeMode={FastImage.resizeMode.contain}
                  style={styles.avt}
                  source={{
                    uri: 'https://scontent.fsgn5-5.fna.fbcdn.net/v/t39.30808-1/185204302_1163620777456081_5636434007978208375_n.jpg?stp=dst-jpg_p160x160&_nc_cat=100&ccb=1-7&_nc_sid=7206a8&_nc_ohc=n5K2_0IVSBQAX_HNcsq&_nc_ht=scontent.fsgn5-5.fna&oh=00_AfCQTIbASnty8f2flBdymwChaOR5y2c4zh0TvA7BxT-Jeg&oe=641AB87B',
                  }}
                />
                <Pressable style={styles.buttonEdit}>
                  <IconEditor width={15} height={15} />
                </Pressable>
              </View>
              <Text style={[HeadingRegular, {marginTop: 5}]}>{name}</Text>
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

        {/* Bookmark list */}
        {/* <View style={{marginTop: 30}}>
          <Text style={[Heading, {marginBottom: 15}]}>Bookmark</Text>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal>
            {FILM_DATA.map((item, index) => {
              return <Film data={item} style={styles.filmContainerStyle} />;
            })}
          </ScrollView>
        </View> */}

        {/* History list */}
        <View style={{marginTop: 30}}>
          <Text style={[Heading, {marginBottom: 15}]}>History</Text>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal>
            {FILM_DATA.map((item, index) => {
              return (
                <Film
                  key={item._id}
                  textBox={'Tập 1'}
                  data={item}
                  style={styles.filmContainerStyle}
                />
              );
            })}
          </ScrollView>
        </View>
      </SafeAreaView>
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
