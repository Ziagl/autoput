import { format } from 'date-fns';
import { DateConverter } from '../DateConverter'
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ListItem = ({ item, functions }) => {
  return (
    <TouchableOpacity style={styles.listItem} key={item.id}>
      <View style={styles.listItemView}>
        <Text style={styles.listItemText}>{item.task_name + " " + format(DateConverter.dBDateToJSDate(item.time), "HH:mm")}</Text>
        <View style={styles.listItemButtons}>
          {functions === undefined ? null : functions.map(element => (
            <>
              <Text>     </Text>
              <Icon name={element.icon} size={30} color={element.color} onPress={() => element.callback(item.id)} />
            </>
          ))}
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

export default ListItem;