import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TaskData } from '../data/Metadata'

interface Props {
  data: TaskData;
}

class TaskListObject extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
    console.log("TaskListObject: " + props);
  }

  render() {
    return (
      <View style={styles.listItemView}>
        <Text style={styles.text}>TEst: {this.props.data.name}</Text>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  listItemView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    color: 'black',
    fontSize: 23,
    textAlign: 'center',
  },
});

export default TaskListObject;