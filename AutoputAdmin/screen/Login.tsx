import React from 'react';
import {
  SafeAreaView,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
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
}

class Login extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      errorMessage: "",
    }
  }

  onChangeUsername = textValue => this.setState({ username: textValue });
  onChangePassword = textValue => this.setState({ password: textValue });
  onLogin = async () => {
    this.setState({ errorMessage: "" });
    if (await Api.getInstance().ping()) {
      if (await Api.getInstance().login(this.state.username, this.state.password)) {
        this.props.navigation.navigate("TaskList");
      }
      else {
        this.setState({ errorMessage: "Username or Password wrong." });
      }
    }
    else {
      this.setState({ errorMessage: "Connection to Server failed." });
    }

    setTimeout(() => { this.setState({ errorMessage: "" }) }, 5000);
  }
  onTestLogin = async () => {
    this.setState({ errorMessage: "" });
    if (await Api.getInstance().login("admin", "admin123")) {
      this.props.navigation.navigate("TaskList");
    }
    else {
      this.setState({ errorMessage: "Connection to Server failed." });
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={require('../assets/login.jpg')}
          resizeMode="stretch"
          style={styles.img}>
          <TextInput
            placeholder="Username"
            placeholderTextColor="black"
            style={styles.loginInput}
            onChangeText={this.onChangeUsername} />
          <TextInput
            placeholder="Password"
            placeholderTextColor="black"
            secureTextEntry={true}
            style={styles.loginInput}
            onChangeText={this.onChangePassword} />
          <TouchableOpacity style={styles.loginBtn} onPress={() => this.onLogin()}>
            <Text style={styles.loginBtnText}><Icon name="sign-in" size={30} /> Login</Text>
          </TouchableOpacity>
          <Text style={styles.loginError}>{this.state.errorMessage}</Text>
        </ImageBackground>
      </SafeAreaView>
    );
  }
};

export default Login;