import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
} from 'react-native';
import { TaskDetails } from '../data/Metadata';

// components
import TaskDetailObject from '../components/TaskDetailObject'

interface Props {
  navigation: any,
  route: any,
}
interface State { }

class TaskDetail extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const data = this.props.route.params.data;
    console.log("TaskDetail123:");
    console.log(data);
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <Text style={styles.text}>{data.name}</Text>
          {data.details.map((element: TaskDetails) => {
            return (
              <TaskDetailObject key={element.name} data={element} />
            );
          })
          }
        </ScrollView>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  scrollView: {

  },
  text: {
    color: 'black',
    fontSize: 23,
    textAlign: 'center',
  },
});

export default TaskDetail;