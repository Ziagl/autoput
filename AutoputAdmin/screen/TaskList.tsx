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
import AnimatedLoader from "react-native-animated-loader";

import { Api, Task } from '../Api';
import styles from '../Style';

// components
import ListItem from '../components/ListItem'

interface Props {
  navigation: any,
}
interface State {
  tasks: Task[],
  loading: boolean,
  refreshing: boolean,
}

class TaskList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      tasks: [],
      loading: true,
      refreshing: false,
    }
    this.init();
  }

  async init() {
    var tasks = await Api.getInstance().fetchTasks();
    this.setState({ tasks: tasks, loading: false, refreshing: false });
  }

  onEditTask = (id) => {
    console.log("edit task called with id " + id);
    this.props.navigation.navigate("TaskDetail", { id: id });
  }

  onDeleteTask = (id) => {
    // remove item by api call from database
    Api.getInstance().deleteTask(id);
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

  onAddJobs = (id: number) => {
    this.props.navigation.navigate("TaskJobs", { id: id });
  }

  onAddTask = () => {
    this.props.navigation.navigate("TaskDetail", { id: 0 });
  }

  onRefresh = () => {
    this.setState({ refreshing: true });
    this.init();
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
        <FlatList
          data={this.state.tasks}
          renderItem={({ item }) => <ListItem item={item} functions={[{ callback: this.onAddJobs, icon: "handshake-o", color: "blue" }, { callback: this.onEditTask, icon: "edit", color: "green" }, { callback: this.onDeleteTask, icon: "remove", color: "firebrick" }]} />}
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