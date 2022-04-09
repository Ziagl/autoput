import React from 'react';
import {
  SafeAreaView,
  FlatList,
  ImageBackground,
  RefreshControl,
  NativeEventEmitter,
  EmitterSubscription,
} from 'react-native';

import { Api, Task } from '../Api';
import styles from '../Style';

// components
import TaskListItem from '../components/TaskListItem'

interface Props {
  navigation: any,
  route: any,
}
interface State {
  list: Task[],
  refreshing: boolean,
}

class TaskList extends React.Component<Props, State> {
  private _eventEmitter: NativeEventEmitter;
  private _emitterSubscription: EmitterSubscription;

  constructor(props: Props) {
    super(props);

    this._emitterSubscription = null;
    this._eventEmitter = new NativeEventEmitter;

    this.state = {
      list: this.props.route.params.list,
      refreshing: false,
    }
  }

  async init() {
    this.setState({ list: await Api.getInstance().getTasks(), refreshing: false });
  }

  componentDidMount() {
    // Attach listeners on mount
    if (this._emitterSubscription == null) {
      this._emitterSubscription = this._eventEmitter.addListener('TaskList.onSave', (e) => this.onSave(e))
    }
  }

  componentWillUnmount() {
    // Remove listeners on unmount
    if (this._emitterSubscription != null) {
      this._emitterSubscription.remove();
    }
  }

  onRefresh = () => {
    this.setState({ refreshing: true });
    this.init();
  }

  onSave = (task: Task) => {
    console.log("TaskList onSave");
    // update one job from sub component change
    let taskArray = this.state.list.slice();
    let index = 0;
    for (let i = 0; i < taskArray.length; ++i) {
      if (taskArray[i].task_id == task.task_id) {
        index = i;
        break;
      }
    }
    taskArray[index] = task;
    // save value on local state
    this.setState(
      { list: taskArray }
    );
  }

  onClick = (task: Task) => {
    this.props.navigation.navigate("TaskDetail", { task: task });
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={require('../assets/login.jpg')}
          resizeMode="stretch"
          style={styles.img}>
          <FlatList
            data={this.state.list}
            renderItem={({ item }) => <TaskListItem item={item} callback={this.onClick} />}
            keyExtractor={(item) => "" + item.jobs[0].id}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh}
              />
            }
          />
        </ImageBackground>
      </SafeAreaView>
    );
  }
};

export default TaskList;