import React from 'react';
import { Text, StyleSheet } from 'react-native';
import AnimatedLoader from "react-native-animated-loader";

const Loader = ({ visible }) => {
  return (
    <AnimatedLoader
      visible={visible}
      overlayColor="rgba(238,22,42,0.75)"
      source={require("../loader.json")}
      animationStyle={styles.loader}
      speed={1}
    >
      <Text style={styles.text}>Loading Data...</Text>
    </AnimatedLoader>
  );
};

const styles = StyleSheet.create({
  loader: {
    width: 100,
    height: 100,
  },
  text: {
    color: 'white',
    fontSize: 30,
    textAlign: 'center',
  },
});

export default Loader;