import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ActivityIndicator,
    Image,
    Dimensions,
    RefreshControl,
    FlatList,
    Text,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Api, Task } from '../Api';
import styles from '../Style';

// components
import ListItem from '../components/ListItem'

interface Props {
    navigation: any,
}
interface State {
    tasks: Task[],
    refreshing: boolean,
}

class TaskList extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            tasks: [],
            refreshing: false,
        }
        this.init();
    }

    async init() {
        this.setState({ tasks: await Api.getInstance().fetchTasks() });
    }

    onEditTask = (id) => {
        console.log("edit task called with id " + id);
        this.props.navigation.navigate("TaskDetail", { id: id });
    }

    onDeleteTask = (id) => {
        // remove item by api call from database
        Api.getInstance().deleteJob(id);
        // remove item from local state to force a reload
        let index = this.state.tasks.findIndex((task) => {
            if (task.id == id) {
                return true;
            }
            return false;
        });
        this.state.tasks.splice(index, 1);
        this.setState({ tasks: this.state.tasks });
    }

    wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }

    onAddTask = () => {
        this.props.navigation.navigate("TaskDetail", { id: 0 });
    }

    onRefresh = () => {
        this.setState({ refreshing: true });
        this.wait(2000)
            .then(() => {
                this.setState({ refreshing: false });
                this.init();
            });
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={this.state.tasks}
                    renderItem={({ item }) => <ListItem item={item} editItem={this.onEditTask} deleteItem={this.onDeleteTask} />}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh}
                        />
                    }
                />
                <TouchableOpacity style={styles.btn} onPress={() => this.onAddTask()}>
                    <Text style={styles.btnText}><Icon name="plus" size={20} /> New Task</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }
};

export default TaskList;