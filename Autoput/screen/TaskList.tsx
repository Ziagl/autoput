import React from 'react';
import {
  SafeAreaView,
  FlatList,
  ImageBackground,
  RefreshControl,
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
  constructor(props: Props) {
    super(props);

    this.state = {
      list: this.props.route.params.list,
      refreshing: false,
    }
  }

  async init() {
    this.setState({ list: await Api.getInstance().getTasks(), refreshing: false });
  }

  onRefresh = () => {
    this.setState({ refreshing: true });
    this.init();
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