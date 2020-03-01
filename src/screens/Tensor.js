import * as React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Dimensions,
} from 'react-native';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';

export default function TensorScreen({navigation}) {
  let linearModel = {};
  let [state, setState] = React.useState({
    loading: false,
    value: undefined,
    number: 0,
  });

  const trainModels = async (xs, ys) => {
    const layers = tf.layers.dense({
      units: 1,
      inputShape: [1],
    });
    const lossAndOptimizer = {
      loss: 'meanSquaredError',
      optimizer: 'sgd',
    };

    linearModel = tf.sequential();
    linearModel.add(layers);
    linearModel.compile(lossAndOptimizer);

    await linearModel.fit(tf.tensor1d(xs), tf.tensor1d(ys));
  };

  const predict = value => {
    return Array.from(
      linearModel.predict(tf.tensor2d([value], [1, 1])).dataSync(),
    );
  };

  const generateLinearAray = limit => {
    const nums = [];
    for (let index = 1; index <= limit; index++) {
      nums.push(index);
    }
    return nums;
  };

  const doTfStuff = async () => {
    try {
      setState({...state, loading: true, value: undefined});
      const nums = generateLinearAray(10);
      const doubled = nums.map(x => 2 * x);
      await tf.ready();
      await trainModels(nums, doubled);
      const nextValue = predict(state.number);
      setState({...state, loading: false, value: Math.round(nextValue[0])});
    } catch (error) {
      console.error(error);
      setState({...state, loading: false});
    }
  };

  //React.useEffect(() => initTf());

  return (
    <View style={styles.container}>
      <View styles={styles.header}>
        <Text style={styles.headerText}>Tensorflow Js</Text>
        <Text style={styles.headerSubtitleText}>x = 2x regression</Text>
      </View>

      <TextInput
        textContentType="telephonenumber"
        onChangeText={val => {
          console.log(val);
          setState({...state, number: parseInt(val, 0)});
        }}
        placeholder="Escriba aquí su valor númerico"
        style={styles.textInput}
      />
      <Text style={styles.numberObtained}>{`${state.value ?? ''}`}</Text>

      {!state.loading ? (
        <TouchableOpacity onPress={() => doTfStuff()} style={styles.button}>
          <Text style={styles.buttonText}>Try!</Text>
        </TouchableOpacity>
      ) : (
        <ActivityIndicator color="#ff6f00" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    maxWidth: Dimensions.get('screen').width,
    justifyContent: 'space-around',
    backgroundColor: '#ffff',
  },
  textInput: {
    width: Dimensions.get('screen').width * 0.8,
    padding: 20,
    fontSize: 16,
    color: '#ff6f00',
    borderBottomColor: '#ff6f00',
    borderBottomWidth: 2,
    marginBottom: 20,
  },
  header: {
    width: Dimensions.get('screen').width * 0.8,
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    textAlign: 'left',
  },
  headerText: {
    fontSize: 36,
    color: '#ff6f00',
    fontWeight: 'bold',
    textAlign: 'left',
  },
  headerSubtitleText: {
    fontSize: 24,
    color: '#ff6f00',
    fontWeight: 'bold',
    textAlign: 'left',
  },
  button: {
    backgroundColor: '#ff6f00',
    width: '80%',
    padding: 20,
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
  },
  numberObtained: {
    fontSize: 54,
    color: '#ff6f00',
    textAlign: 'center',
  },
});
