import * as React from 'react';
import {View, Text} from 'react-native';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';

export default function HomeScreen({navigation}) {
  tf.ready()
    .then(res => {
      console.log(res);
      console.log('seems ready');
    })
    .catch(err => {
      console.log(err);
    });

  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
    </View>
  );
}
