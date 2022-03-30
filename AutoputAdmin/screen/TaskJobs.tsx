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

import { Api, Task, Job, TaskJob } from '../Api';
import styles from '../Style';

// components
import ListItem from '../components/ListItem'

interface Props {
  navigation: any,
  route: any,
}
interface State {
  task: Task,
  jobs: Job[],
  taskJobs: TaskJob[],
  loading: boolean,
  refreshing: boolean,
}

class TaskJobs extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      task: { id: props.route.params.id, name: "", duedate: "2022-01-01 00:00:00", enddate: "2022-01-01 00:00:00", date_recurrency: 0, time_recurrency: 0 },
      jobs: [],
      taskJobs: [],
      loading: props.route.params.id === 0 ? false : true,
      refreshing: false,
    }
    this.init();
  }

  async init() {
    var task = await Api.getInstance().fetchTask(this.props.route.params.id);
    var jobs = await Api.getInstance().fetchJobs();
    var taskJobs = await Api.getInstance().fetchTaskJobs(this.props.route.params.id);
    this.setState({ task: task, jobs: jobs, taskJobs: taskJobs, loading: false, refreshing: false });
  }

  onRefresh = () => {
    this.setState({ refreshing: true });
    this.init();
  }

  onDeleteJob = (id) => {
    // remove item by api call from database
    Api.getInstance().deleteTaskJob(id);
    // remove item from local state to force a reload
    let index = this.state.taskJobs.findIndex((taskJob) => {
      if (taskJob.id == id) {
        return true;
      }
      return false;
    });
    this.state.taskJobs.splice(index, 1);
    this.setState({ taskJobs: this.state.taskJobs });
  }

  onAddJob = () => {
    console.log("onAddJob");
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
          data={this.state.taskJobs}
          renderItem={({ item }) => <ListItem item={item} addItem={null} editItem={null} deleteItem={this.onDeleteJob} />}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          }
        />
        <TouchableOpacity style={styles.btn} onPress={() => this.onAddJob()}>
          <Text style={styles.btnText}><Icon name="plus" size={20} /> Add Job</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
};

export default TaskJobs;