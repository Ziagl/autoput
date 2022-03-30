import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const ListItem = ({ item, addItem, editItem, deleteItem }) => {
  return (
    <TouchableOpacity style={styles.listItem}>
      <View style={styles.listItemView}>
        <Text style={styles.listItemText}>{item.name}</Text>
        <View style={styles.listItemButtons}>
          {addItem != null ? (
            <Icon name="handshake-o" size={30} color="blue" onPress={() => addItem(item.id)} />
          ) : null}
          {editItem != null && addItem != null ? (
            <Text>     </Text>
          ) : null}
          {editItem != null ? (
            <Icon name="edit" size={30} color="green" onPress={() => editItem(item.id)} />
          ) : null}
          {editItem != null && deleteItem != null ? (
            <Text>     </Text>
          ) : null}
          {deleteItem != null ? (
            <Icon name="remove" size={30} color="firebrick" onPress={() => deleteItem(item.id)} />
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  listItem: {
    padding: 15,
    backgroundColor: '#f8f8f8',
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  listItemView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listItemButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listItemText: {
    color: 'black',
    fontSize: 18,
  },
});

export default ListItem;