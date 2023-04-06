import {Pressable, StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {IconNotify, IconSetting, Logo} from '../../assets/svgs';
import {Colors} from '../../assets/colors';
import {RefreshControl, ScrollView} from 'react-native-gesture-handler';
import {Heading, Medium15} from '../../assets/typography';
import Film from '../../components/Film';
import AxiosInstance from '../../utils/AxiosInstance';
import {useSelector} from 'react-redux';

const FavoriteScreen = ({navigation}) => {
  const [listMyCollection, setListMyCollection] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const {_id} = useSelector(state => state.dataUser);

  const handleGetMyCollection = async () => {
    setIsLoading(true);
    try {
      const res = await AxiosInstance().get(`auth/collections/${_id}`);
      console.log(res);
      if (!res.error) {
        setListMyCollection(res.data);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };

  const onRefresh = () => {
    setIsLoading(true);
    handleGetMyCollection();
  };

  React.useEffect(() => {
    handleGetMyCollection();
  }, []);

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

      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl onRefresh={onRefresh} refreshing={isLoading} />
        }>
        {/* collection list */}
        <View>
          <Text style={[Heading, {marginBottom: 15}]}>My Collection</Text>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal>
            {listMyCollection?.map((item, index) => {
              return (
                <Film
                  data={item}
                  key={item._id}
                  style={styles.filmContainerStyle}
                  onPress={() => {
                    navigation.navigate('WatchFilmScreen', {
                      data: item,
                      episodeIndex: 0,
                    });
                  }}
                />
              );
            })}
          </ScrollView>
          {listMyCollection?.length === 0 && !isLoading && (
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
        {/* Bookmark list */}
        <View style={{marginTop: 30}}>
          {/* <Text style={[Heading, {marginBottom: 15}]}>Bookmark</Text> */}
          <ScrollView showsHorizontalScrollIndicator={false} horizontal>
            {/* {FILM_DATA.map((item, index) => {
              return (
                <Film
                  data={item}
                  key={item._id}
                  style={styles.filmContainerStyle}
                />
              );
            })} */}
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
