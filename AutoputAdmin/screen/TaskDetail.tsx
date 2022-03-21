import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ActivityIndicator,
    Image,
    Dimensions,
    Text,
    TextInput,
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown'
import Icon from 'react-native-vector-icons/FontAwesome';
import AnimatedLoader from "react-native-animated-loader";

import { Api, Task } from '../Api';
import styles from '../Style';

interface Props {
    navigation: any,
    route: any,
}
interface State {
    task: Task,
    loading: boolean
}

class TaskDetail extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            task: { id: props.route.params.id, name: "", duedate: "", date_recurrency: 0, time_recurrency: 0 },
            loading: true,
        }
        if (props.route.params.id != null) {
            this.init();
        }
    }

    onChangeName = textValue => this.state.task.name = textValue;
    onChangeDuedate = textValue => this.state.task.duedate = textValue;

    async init() {
        var task = await Api.getInstance().fetchTask(this.props.route.params.id);
        this.setState({ task: task });
        this.setState({ loading: false });
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <AnimatedLoader
                    visible={this.state.loading}
                    overlayColor="rgba(255,255,255,0.75)"
                    source={require("../loader.json")}
                    animationStyle={styles.loader}
                    speed={1}
                >
                    <Text style={styles.text}>Doing something...</Text>
                </AnimatedLoader>
                <Text style={styles.text}>Name</Text>
                <TextInput placeholder="Name" style={styles.input} value={this.state.task.name} onChangeText={this.onChangeName} />
                <Text style={styles.text}>Duedate</Text>
                <TextInput placeholder="01-01-2022 12:00" style={styles.input} value={this.state.task.name} onChangeText={this.onChangeDuedate} />

            </SafeAreaView>
        );
    }
};

export default TaskDetail;