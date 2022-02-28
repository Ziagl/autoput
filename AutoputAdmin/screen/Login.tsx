import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/dist/FontAwesome';

interface Props { }
interface State {
    username: string;
    password: string;
}

class Login extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            username: "",
            password: "",
        }
    }

    onChangeUsername = textValue => this.setState({ username: textValue });
    onChangePassword = textValue => this.setState({ password: textValue });
    onLogin = () => {
        console.log(this.state.username + " " + this.state.password);
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Text>Username:</Text>
                <TextInput placeholder="Username" style={styles.input} onChangeText={this.onChangeUsername} />
                <Text>Password:</Text>
                <TextInput placeholder="Password" secureTextEntry={true} style={styles.input} onChangeText={this.onChangePassword} />
                <TouchableOpacity style={styles.btn} onPress={() => this.onLogin()}>
                    <Text style={styles.btnText}><Icon name="plus" size={20} />Login</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: '#ffffff',
    },
    text: {
        color: 'black',
        fontSize: 23,
        textAlign: 'center',
    },
    input: {
        color: 'black',
        height: 60,
        padding: 8,
        fontSize: 16,
    },
    btn: {
        backgroundColor: '#c2bad8',
        padding: 9,
        margin: 5,
    },
    btnText: {
        color: 'darkslateblue',
        fontSize: 20,
        textAlign: 'center',
    },
});

export default Login;