import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
  ImageBackground,
  FlatList,
} from 'react-native';

import { Job } from '../Api';
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
  constructor(props: Props) {
    super(props);

    this.state = {
      task: props.route.params.task,
    }
  }

  onSave = () => {
    console.log("TaskDetail onSave");
  }

  render() {
    const data = this.props.route.params.task;
    console.log("TaskDetail123:");
    console.log(this.state.task);
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={require('../assets/login.jpg')}
          resizeMode="stretch"
          style={styles.img}>
          <Text style={styles.text}>{data.name}</Text>
          <FlatList
            data={data.jobs}
            renderItem={({ item }) => <JobListItem item={item} callback={this.onClick} />}
            keyExtractor={(item) => "" + item.id}
          />
        </ImageBackground>
      </SafeAreaView>
    );
  }
};

/*


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


                <ScrollView contentContainerStyle={styles.scrollView}>
                  <Text style={styles.text}>{data.name}</Text>
                  {this.state.task.jobs.map((element: Job) => {
                    return (
                      <TaskDetailObject key={element.name} data={element} />
                    );
                  })
                  }
                </ScrollView>
*/

export default TaskDetail;