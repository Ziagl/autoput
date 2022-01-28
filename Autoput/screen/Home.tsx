import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  Image,
  Dimensions,
  Text,
} from 'react-native';

interface Props { }
interface State {
  imgUrl: string,
  imgWidth: number,
  imgHeight: number,
}

class Home extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      imgUrl: '../img/Logo.png',
      imgWidth: 0,
      imgHeight: 0,
    }
  }

  componentDidMount() {
    // get image metadata
    const imgProps = Image.resolveAssetSource(require('../img/Logo.png'));
    // calculate image width and height 
    const screenWidth = Dimensions.get('window').width
    const scaleFactor = imgProps.width / screenWidth
    const imageHeight = imgProps.height / scaleFactor
    this.setState({ imgWidth: screenWidth, imgHeight: imageHeight })
  }

  render() {
    const { imgWidth, imgHeight } = this.state

    return (
      <SafeAreaView style={styles.container}>
        <Image
          source={require('../img/Logo.png')}
          style={{ width: imgWidth, height: imgHeight, marginTop: (Dimensions.get('window').height / 2) - (imgHeight + 80) / 2 }}
        />
        <ActivityIndicator size={80} color="#ed1c2e" />
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

export default Home;