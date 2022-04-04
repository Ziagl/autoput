import { format } from 'date-fns';
import { DateConverter } from '../DateConverter'
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const TaskListItem = ({ item, callback }) => {
  let ok = false;
  item.jobs.map((job) => {
    if (job.value != null) {
      ok = true;
    }
  });
  return (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => callback(item)}
    >
      <View style={styles.listItemView}>
        <Text style={styles.listItemText}>{item.name + " " + format(DateConverter.dBDateToJSDate(item.time), "HH:mm")}</Text>
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