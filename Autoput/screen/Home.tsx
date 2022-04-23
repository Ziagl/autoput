import React from 'react';
import {
  SafeAreaView,
  Alert,
  NativeEventEmitter,
  EmitterSubscription,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  private _eventEmitter: NativeEventEmitter;
  private _emitterSubscription: EmitterSubscription;

  constructor(props: Props) {
    super(props);

    this._emitterSubscription = null;
    this._eventEmitter = new NativeEventEmitter;

    this.state = {
      loading: false,
    }
    this.init();
  }

  componentDidMount() {
    // Attach listeners on mount
    if (this._emitterSubscription == null) {
      this._emitterSubscription = this._eventEmitter.addListener('Home.onUpdate', (e) => this.onUpdate(e))
    }
  }

  componentWillUnmount() {
    // Remove listeners on unmount
    if (this._emitterSubscription != null) {
      this._emitterSubscription.remove();
    }
  }

  onUpdate = (e: any) => {
    this.init();
  }

  navigateToSettings = () => {
    this.props.navigation.navigate("Settings");
  }

  async init() {
    const savedUrl = await AsyncStorage.getItem('url');
    if (savedUrl === null) {
      this.navigateToSettings();
    } else {
      Api.getInstance().setUrl(savedUrl);
      let response = await Api.getInstance().getTasks();
      if (response === undefined) {
        Alert.alert(
          "API Error",
          "Please check your internet connection!",
          [
            { text: "Settings", onPress: () => this.navigateToSettings() },
            { text: "Try again", onPress: () => this.init() },
          ]
        );
      }
      else {
        this.setState({ loading: false });
        this.props.navigation.navigate("TaskList", { list: response });
      }
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