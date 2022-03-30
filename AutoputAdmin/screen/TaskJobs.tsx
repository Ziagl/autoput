import React from 'react';
import {
  SafeAreaView,
  View,
  ScrollView,
  Modal,
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
  dialogVisible: boolean,
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
      dialogVisible: false,
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

  onShowDialog = () => {
    this.setState({ dialogVisible: true });
  }

  onAddJob = (id: number) => {
    Api.getInstance().addTaskJob(this.state.task.id, id);
    this.setState({ dialogVisible: false });
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
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.dialogVisible}
          onRequestClose={() => {
            this.setState({ dialogVisible: false });
          }}
        >
          <View style={styles.dialog}>
            <View style={styles.modal}>
              {this.state.jobs === undefined ? null : this.state.jobs.map(job => (
                <TouchableOpacity style={styles.btn} onPress={() => this.onAddJob(job.id)} key={job.id}>
                  <Text style={styles.btnText}>{job.name}</Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity style={styles.btn} onPress={() => this.setState({ dialogVisible: false })}>
                <Text style={styles.btnText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <FlatList
          data={this.state.taskJobs}
          renderItem={({ item }) => <ListItem item={item} functions={[{ callback: this.onDeleteJob, icon: "remove", color: "firebrick" }]} />}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.onRefresh}
            />
          }
        />
        <TouchableOpacity style={styles.btn} onPress={() => this.onShowDialog()}>
          <Text style={styles.btnText}><Icon name="plus" size={20} /> Add Job</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
};

export default TaskJobs;