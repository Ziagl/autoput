import React from 'react';
import { Text, StyleSheet } from 'react-native';
import AnimatedLoader from "react-native-animated-loader";

interface Props {
  visible: boolean
}
interface State {

}

class Loader extends React.Component<Props, State>{
  constructor(props: Props) {
    super(props);
  }
  render() {
    return (
      <AnimatedLoader
        visible={this.props.visible}
        overlayColor="rgba(238,22,42,0.75)"
        source={require("../assets/loader.json")}
        animationStyle={styles.loader}
        speed={1}
      >
        <Text style={styles.text}>Loading Data...</Text>
      </AnimatedLoader>
    );
  }
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