import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Dimensions} from 'react-native';
import Film from './Film';

const {width} = Dimensions.get('window');

const ListViewGrid = ({data, style, horizontalSpacing = 10, gap = 15}) => {
  return (
    <SafeAreaView
      style={[
        styles.container,
        {
          ...style,
          paddingHorizontal: horizontalSpacing,
        },
      ]}>
      {data.map((item, index) => (
        <Film
          gap={gap}
          index={index + 1}
          endIndex={data.length}
          style={{
            ...styles.itemList,
          }}
          data={item}
          key={item._id}
          onPress={() => {
            console.log('Film Press!');
          }}
        />
      ))}
    </SafeAreaView>
  );
};

export default ListViewGrid;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    flex: 1,
    // backgroundColor: 'red',
  },
  itemList: {
    marginBottom: 15,
  },
});
