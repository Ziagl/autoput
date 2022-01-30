import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { TaskDetails } from '../data/Metadata'

interface Props {
  data: TaskDetails;
}

class TaskDetailObject extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
    console.log("TaskDetailObject: " + props);
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

export default TaskDetailObject;