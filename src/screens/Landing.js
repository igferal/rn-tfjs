import * as React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

export default function HomeScreen({navigation}) {
  return (
    <View style={styles.container}>
      <View styles={styles.header}>
        <Text style={styles.headerText}>Tensorflow Js</Text>
        <Text style={styles.subtitleText}>Bare React native integration</Text>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Tensor');
        }}
        style={styles.button}>
        <Text style={styles.buttonText}>Try!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#ff6f00',
  },
  header: {
    width: '80%',
    justifyContent: 'space-around',
  },
  headerText: {
    fontSize: 36,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'left',
  },
  subtitleText: {
    fontSize: 20,
    color: '#fff',
  },
  button: {
    backgroundColor: '#fff',
    width: '80%',
    padding: 20,
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 18,
    color: '#ff6f00',
    textAlign: 'center',
  },
});
