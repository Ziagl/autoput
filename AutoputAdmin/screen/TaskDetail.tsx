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

    async init() {
        var task = await Api.getInstance().fetchTask(this.props.route.params.id);
        this.setState({ task: task });
        this.setState({ loading: false });
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>

            </SafeAreaView>
        );
    }
};

export default TaskDetail;