import { format } from 'date-fns';
import { DateConverter } from '../DateConverter'
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Task } from '../Api';

interface Props {
  item: Task,
  callback: Function,
}
interface State { }

class TaskListItem extends React.Component<Props, State>{
  constructor(props: Props) {
    super(props);
  }

  render() {
    let ok = true;
    this.props.item.jobs.map((element) => {
      if (element.value === null) ok = false;
    });
    return (
      <TouchableOpacity
        style={styles.listItem}
        onPress={() => this.props.callback(this.props.item)}
      >
        <View style={styles.listItemView}>
          <Text style={styles.listItemText}>{this.props.item.name + " " + format(DateConverter.dBDateToJSDate(this.props.item.time), "HH:mm")}</Text>
          <View style={styles.listItemButtons}>
            {ok ? (
              <Icon name={"check"} size={30} color={"green"} />
            ) : (
              <Icon name={"remove"} size={30} color={"firebrick"} />
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  }
};

const styles = StyleSheet.create({
  listItem: {
    padding: 15,
    backgroundColor: '#f8f8f8aa',
    borderBottomWidth: 2,
    borderColor: '#000000aa',
  },
  listItemView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: "100%",
  },
  listItemButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listItemText: {
    color: 'black',
    fontSize: 20,
    fontWeight: "500",
  },
});

export default TaskListItem;