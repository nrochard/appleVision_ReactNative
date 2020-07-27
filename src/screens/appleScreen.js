import React from 'react';
import { Text, View , FlatList} from 'react-native';
import * as firebase from 'firebase'
import ApiKeys from '../config/Firebase';

const HelloWorldApp = () => {

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
      }}>
      <Text>List of apple picture</Text>
    </View>
  )
}
export default HelloWorldApp;
