import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
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
    if (await Api.getInstance().login(this.state.username, this.state.password)) {
      this.props.navigation.navigate("TaskList");
    }
    else {
      this.setState({ errorMessage: "Something went wrong." });
    }
  }
  onTestLogin = async () => {
    this.setState({ errorMessage: "" });
    if (await Api.getInstance().login("admin", "admin123")) {
      this.props.navigation.navigate("TaskList");
    }
    else {
      this.setState({ errorMessage: "Something went wrong." });
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.text}>Username:</Text>
        <TextInput placeholder="Username" style={styles.input} onChangeText={this.onChangeUsername} />
        <Text style={styles.text}>Password:</Text>
        <TextInput placeholder="Password" secureTextEntry={true} style={styles.input} onChangeText={this.onChangePassword} />
        <TouchableOpacity style={styles.btn} onPress={() => this.onLogin()}>
          <Text style={styles.btnText}><Icon name="sign-in" size={20} /> Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.btn} onPress={() => this.onTestLogin()}>
          <Text style={styles.btnText}><Icon name="sign-in" size={20} /> TestLogin</Text>
        </TouchableOpacity>
        <Text>{this.state.errorMessage}</Text>
      </SafeAreaView>
    );
  }
};

export default Login;