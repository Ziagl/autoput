import React from 'react';
import {
  SafeAreaView,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  NativeEventEmitter,
  EmitterSubscription,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Api } from '../Api';
import styles from '../Style';

interface Props {
  navigation: any,
}
interface State {
  username: string,
  password: string,
  errorMessage: string,
  demoMode: boolean,
}

class Login extends React.Component<Props, State> {
  private _eventEmitter: NativeEventEmitter;
  private _emitterSubscription: EmitterSubscription;

  constructor(props: Props) {
    super(props);

    this._emitterSubscription = null;
    this._eventEmitter = new NativeEventEmitter;

    this.state = {
      username: "",
      password: "",
      errorMessage: "",
      demoMode: false,
    }
    this.init();
  }

  componentDidMount() {
    // Attach listeners on mount
    if (this._emitterSubscription == null) {
      this._emitterSubscription = this._eventEmitter.addListener('Login.onUpdate', (e) => this.onUpdate(e))
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
    console.log(savedUrl);
    if (savedUrl === null) {
      //this.navigateToSettings();
      this.setState({ demoMode: true });
    } else {
      Api.getInstance().setUrl(savedUrl);
      this.setState({ demoMode: false });
    }
  }

  onChangeUsername = textValue => this.setState({ username: textValue });
  onChangePassword = textValue => this.setState({ password: textValue });
  onLogin = async () => {
    this.init();
    this.setState({ errorMessage: "" });
    if (await Api.getInstance().ping()) {
      if (await Api.getInstance().login(this.state.username, this.state.password)) {
        this.props.navigation.navigate("TaskList");
      }
      else {
        this.setState({ errorMessage: "Username or password wrong." });
      }
    }
    else {
      this.setState({ errorMessage: "Connection to server failed." });
    }

    setTimeout(() => { this.setState({ errorMessage: "" }) }, 5000);
  }
  onLoginDemo = async () => {
    if (Api.getInstance().demo()) {
      this.props.navigation.navigate("TaskList");
    }
    else {
      this.setState({ errorMessage: "No demo data found." });
    }

    setTimeout(() => { this.setState({ errorMessage: "" }) }, 5000);
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={require('../assets/login.jpg')}
          resizeMode="stretch"
          style={styles.img}>
          {this.state.demoMode === true ? (
            <>
              <TouchableOpacity style={styles.loginBtn} onPress={() => this.onLoginDemo()}>
                <Text style={styles.loginBtnText}><Icon name="sign-in" size={30} /> Demo</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.loginBtn} onPress={() => this.navigateToSettings()}>
                <Text style={styles.loginBtnText}><Icon name="gear" size={30} /> Settings</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TextInput
                placeholder="Username"
                placeholderTextColor="black"
                style={styles.loginInput}
                onChangeText={this.onChangeUsername}
                textContentType="username" />
              <TextInput
                placeholder="Password"
                placeholderTextColor="black"
                secureTextEntry={true}
                style={styles.loginInput}
                onChangeText={this.onChangePassword}
                textContentType="password" />
              <TouchableOpacity style={styles.loginBtn} onPress={() => this.onLogin()}>
                <Text style={styles.loginBtnText}><Icon name="sign-in" size={30} /> Login</Text>
              </TouchableOpacity>
            </>
          )}
          <Text style={styles.loginError}>{this.state.errorMessage}</Text>
        </ImageBackground>
      </SafeAreaView>
    );
  }
};

export default Login;