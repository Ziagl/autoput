import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CheckBox from 'react-native-check-box';
import { TaskDetails } from '../data/Metadata';
//import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

interface Props {
  data: TaskDetails;
}
interface State {
  data: TaskDetails;
}

class TaskDetailObject extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      data: props.data
    }
  }

  renderType() {
    switch (this.props.data.type) {
      case "text":
        return (
          <>
            <Text style={styles.textHeader}>{this.state.data.name}</Text>
            <Text style={styles.text}>{this.state.data.text}</Text>
          </>
        );
      case "bool":
        // https://github.com/crazycodeboy/react-native-check-box
        return (
          <>
            <Text style={styles.textHeader}>{this.state.data.name}</Text>
            <CheckBox
              style={styles.checkbox}
              rightTextStyle={styles.checkboxText}
              rightText={this.state.data.text}
              isChecked={this.state.data.checked}
              onClick={() => {
                this.state.data.checked = !this.state.data.checked;
                this.setState({
                  data: this.state.data
                })
              }}
            />
          </>
        );
      case "image":
        return (
          <>
            <Text style={styles.textHeader}>{this.state.data.name}</Text>
            <Text style={styles.text}>{this.state.data.text}</Text>

          </>
        );
    }
  }

  render() {
    return (
      <View style={styles.listItemView}>
        {this.renderType()}
      </View>
    );
  }
};

const styles = StyleSheet.create({
  listItemView: {
    flex: 3,
    //flexDirection: 'row',
    justifyContent: 'space-between',
    //alignItems: 'center',
    //backgroundColor: '#eeeeee',
  },
  textHeader: {
    flex: 1,
    color: 'black',
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'left',
  },
  text: {
    flex: 1,
    color: 'black',
    fontSize: 23,
    textAlign: 'center',
  },
  checkbox: {
    flex: 1,
  },
  checkboxText: {
    fontSize: 23,
    color: 'black',
  },
});

export default TaskDetailObject;