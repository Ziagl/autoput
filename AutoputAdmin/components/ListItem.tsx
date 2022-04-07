import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

interface Props {
  item: any,
  functions: any,
}
interface State {

}

class ListItem extends React.Component<Props, State>{
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <TouchableOpacity style={styles.listItem}>
        <View style={styles.listItemView}>
          <Text style={styles.listItemText}>{this.props.item.name}</Text>
          <View style={styles.listItemButtons}>
            {this.props.functions === undefined ? null : this.props.functions.map(element => (
              <>
                <Text>     </Text>
                <Icon name={element.icon} size={30} color={element.color} onPress={() => element.callback(this.props.item.id)} />
              </>
            ))}
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

export default ListItem;