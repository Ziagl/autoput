import React from 'react';
import {
  SafeAreaView,
  Alert,
} from 'react-native';

import { Api } from '../Api';
import styles from '../Style';

// components
import Loader from '../components/Loader';

interface Props {
  navigation: any,
}
interface State {
  loading: boolean,
}

class Home extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      loading: false,
    }
    this.init();
  }

  componentDidMount() {
    this.setState({ loading: true });
  }

  async init() {
    let response = await Api.getInstance().getTasks();
    if (response === undefined) {
      Alert.alert(
        "API Error",
        "Please check your internet connection!",
        [
          { text: "Try again", onPress: () => this.init() },
        ]
      );
    }
    else {
      this.setState({ loading: false });
      this.props.navigation.navigate("TaskList", { list: response });
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Loader visible={this.state.loading} />
      </SafeAreaView>
    );
  }
};

export default Home;