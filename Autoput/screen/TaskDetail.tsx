import React from 'react';
import {
  View,
  SafeAreaView,
  Text,
  ImageBackground,
  FlatList,
  NativeEventEmitter,
} from 'react-native';

import { Task, Job } from '../Api';
import styles from '../Style';

// components
import JobListItem from '../components/JobListItem'

interface Props {
  navigation: any,
  route: any,
}
interface State {
  task: Task,
}

class TaskDetail extends React.Component<Props, State> {
  private _eventEmitter: NativeEventEmitter;

  constructor(props: Props) {
    super(props);

    this._eventEmitter = new NativeEventEmitter;

    this.state = {
      task: props.route.params.task,
    }
  }

  onSave = (job: Job) => {
    // update one job from sub component change
    let jobArray = this.state.task.jobs.slice();
    let index = 0;
    for (let i = 0; i < jobArray.length; ++i) {
      if (jobArray[i].id == job.id) {
        index = i;
        break;
      }
    }
    jobArray[index] = job;
    // save value on local state
    this.setState(
      { task: { ...this.state.task, jobs: jobArray } },
      () => this._eventEmitter.emit("TaskList.onSave", this.state.task)
    );
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={require('../assets/login.jpg')}
          resizeMode="stretch"
          style={styles.img}>
          <View style={styles.listItemView && styles.listItem}>
            <Text style={styles.listItemText}>{this.state.task.name}</Text>
          </View>
          <FlatList
            data={this.state.task.jobs}
            renderItem={({ item }) => <JobListItem item={item} callback={this.onSave} />}
            keyExtractor={(item) => "" + item.id}
            style={{ width: '100%' }}
          />
        </ImageBackground>
      </SafeAreaView>
    );
  }
};

export default TaskDetail;