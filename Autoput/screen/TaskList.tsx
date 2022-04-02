import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  Alert,
  Dimensions,
  View,
  Text,
  TouchableHighlight
} from 'react-native';
import TaskDetail from './TaskDetail';

import { Api, List, ListElement } from '../Api';
import styles from '../Style';

// components
import TaskListObject from '../components/TaskListObject'
import { NavigationContainer } from '@react-navigation/native';

interface Props {
  navigation: any,
}
interface State {
  list: List | undefined,
}

class TaskList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      list: undefined
    }
    this.init();
  }

  async init() {
    this.setState({ list: await Api.getInstance().getData() });
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          {this.state.list != undefined ? (
            this.state.list.data.map((element: ListElement) => {
              return (
                <TouchableHighlight
                  key={element.id}
                  activeOpacity={0.6}
                  underlayColor="#DDDDDD"
                  onPress={() => this.props.navigation.navigate("TaskDetail", { data: element })}
                  style={styles.listItem}>
                  <TaskListObject data={element} />
                </TouchableHighlight>
              );
            })
          ) : (
            <ActivityIndicator size={80} color="#ed1c2e" style={{ marginTop: Dimensions.get('window').height / 2 - 130 }} />
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }
};

export default TaskList;