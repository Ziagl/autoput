import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ListElement } from '../Api'

interface Props {
  data: ListElement;
}

class TaskListObject extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props);
    console.log(props);
  }

  render() {
    return (
      <View style={styles.listItemView}>
        <Text style={styles.text}>Test: {this.props.data.task_name + " " + this.props.data.id}</Text>
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