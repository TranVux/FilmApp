import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {IconNotify, IconSetting, Logo} from '../../assets/svgs';
import {Colors} from '../../assets/colors';
import {ScrollView} from 'react-native-gesture-handler';
import {Heading} from '../../assets/typography';
import Film from '../../components/Film';
import {FILM_DATA} from '../../assets/data/FilmData';

const FavoriteScreen = ({navigation}) => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Colors.primary,
        padding: 15,
        paddingTop: 0,
        paddingBottom: 70,
      }}>
      <View style={styles.header}>
        <Pressable>
          <IconNotify />
        </Pressable>
        <Logo width={74} height={54} />
        <Pressable
          onPress={() => {
            navigation.navigate('SettingScreen');
          }}>
          <IconSetting />
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* collection list */}
        <View>
          <Text style={[Heading, {marginBottom: 15}]}>My Collection</Text>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal>
            {FILM_DATA.map((item, index) => {
              return (
                <Film
                  textBox={'1 Tập'}
                  data={item}
                  key={item._id}
                  style={styles.filmContainerStyle}
                />
              );
            })}
          </ScrollView>
        </View>

        {/* Bookmark list */}
        <View style={{marginTop: 30}}>
          <Text style={[Heading, {marginBottom: 15}]}>Bookmark</Text>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal>
            {FILM_DATA.map((item, index) => {
              return (
                <Film
                  data={item}
                  key={item._id}
                  style={styles.filmContainerStyle}
                />
              );
            })}
          </ScrollView>
        </View>
      </ScrollView>
    </View>
    // </ScrollView>
  );
};

export default FavoriteScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 15,
  },
});