import { format } from 'date-fns';
import { DateConverter } from '../DateConverter'
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface Props {
  item: any,
  callback: Function,
}
interface State {

}

class TaskListItem extends React.Component<Props, State>{
  constructor(props: Props) {
    super(props);
  }

  render() {
    let ok = false;
    this.props.item.jobs.map((job) => {
      if (job.value != null) {
        ok = true;
      }
    });
    return (
      <TouchableOpacity
        style={styles.listItem}
        onPress={() => this.props.callback(this.props.item)}
      >
        <View style={styles.listItemView}>
          <Text style={styles.listItemText}>{this.props.item.name + " " + format(DateConverter.dBDateToJSDate(this.props.item.time), "HH:mm")}</Text>
          <View style={styles.listItemButtons}>
            {ok === false ? (
              <Icon name={"remove"} size={30} color={"firebrick"} />
            ) : (
              <Icon name={"check"} size={30} color={"green"} />
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