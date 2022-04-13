import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  NativeEventEmitter,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import styles from '../Style';

interface Props {
  navigation: any,
}
interface State {
  url: string,
  filename: string,
}

class Settings extends React.Component<Props, State> {
  private _eventEmitter: NativeEventEmitter;

  constructor(props: Props) {
    super(props);

    this._eventEmitter = new NativeEventEmitter;

    this.state = {
      url: "",
      filename: "",
    }
  }

  componentDidMount() {
    this.initialize();
  }

  componentWillUnmount(): void {
    this._eventEmitter.emit("Home.onUpdate", true);
  }

  async initialize(): Promise<void> {
    try {
      const savedUrl = await AsyncStorage.getItem('url');
      if (savedUrl !== null) {
        this.setState({ url: savedUrl });
      }
    } catch (e) {
      console.log("Error reading values from AsyncStorage.");
    }
    return;
  }

  async save(): Promise<void> {
    try {
      await AsyncStorage.setItem('url', this.state.url);
      this.props.navigation.navigate("Home");
    } catch (e) {
      console.log("Error storing values to AsyncStorage.");
    }
    return;
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <Text style={styles.settingsText}>Backend URL</Text>
          <TextInput
            placeholderTextColor={styles.placeholderTextColor.color}
            style={styles.input}
            onChangeText={text => this.setState({ url: text })}
            value={this.state.url}
            placeholder="Backend URL"
          />
        </ScrollView>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => this.save()}
        >
          <Text style={styles.btnText}>Save</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
};

export default Settings;