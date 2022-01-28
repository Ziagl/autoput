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
import { Tasks, TaskData } from '../data/Metadata';

// components
import TaskListObject from '../components/TaskListObject'
import { NavigationContainer } from '@react-navigation/native';

interface Props {
  navigation: any,
}
interface State {
  list: Tasks | undefined,
}

class TaskList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      list: undefined
    }
  }

  componentDidMount() {
    this.api();
  }

  async api(): Promise<void> {
    try {
      const url = "https://ziegelwanger-edv.at/autoput/data.json";
      const data = await (await fetch(url)).json();
      this.setState({ list: data });
      console.log(this.state.list);
    } catch (e) {
      console.log("Error: " + e);
      Alert.alert(
        "API Error",
        "Please check your internet connection!",
        [
          { text: "OK", onPress: () => this.api() },
        ]
      );
    }
    return;
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollView}>
          {this.state.list != undefined ? (
            this.state.list.tasks.map((element: TaskData) => {
              return (
                <TouchableHighlight
                  key={element.name}
                  activeOpacity={0.6}
                  underlayColor="#DDDDDD"
                  onPress={() => this.props.navigation.navigate("TaskDetail", { element })}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {
    paddingBottom: 60,
  },
  listItem: {
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  text: {
    color: 'black',
    fontSize: 23,
    textAlign: 'center',
  },
});

export default TaskList;