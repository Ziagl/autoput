import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ActivityIndicator,
    Image,
    Dimensions,
    Text,
} from 'react-native';

import { Api, Task } from '../Api';

interface Props { }
interface State {
    tasks: Task[],
}

class TaskList extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            tasks: [],
        }
        this.init();
    }

    async init() {
        //let tasksList = await Api.getInstance().fetchTasks();
        //tasksList.map(task => console.log("Task init: " + task.name));
        this.setState({ tasks: await Api.getInstance().fetchTasks() });
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                {this.state.tasks.map(task => (
                    <Text style={styles.text}>{task.name}</Text>
                ))}
            </SafeAreaView>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    text: {
        color: 'black',
        fontSize: 23,
        textAlign: 'center',
    },
});

export default TaskList;