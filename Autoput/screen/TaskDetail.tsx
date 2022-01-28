import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
} from 'react-native';
import { TaskData } from '../data/Metadata';

interface Props {
  navigation: any,
  data: TaskData,
}
interface State { }

class TaskDetail extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    console.log(props);
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text>gffdsgdfsgdfg</Text>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});

export default TaskDetail;