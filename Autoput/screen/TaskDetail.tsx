import React from 'react';
import {
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  Text,
  ImageBackground,
  FlatList,
} from 'react-native';

import { Task } from '../Api';
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
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={require('../assets/login.jpg')}
          resizeMode="stretch"
          style={styles.img}>
          <View style={styles.listItemView && styles.listItem}>
            <Text style={styles.listItemText}>{data.name}</Text>
          </View>
          <FlatList
            data={data.jobs}
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