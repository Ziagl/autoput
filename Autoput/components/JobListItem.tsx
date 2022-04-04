import React from 'react';
import { View, Text, StyleSheet, Button, Image, Alert, TouchableOpacity } from 'react-native';
import CheckBox from 'react-native-check-box';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome';

//import { Job } from '../Api';

const JobListItem = ({ item, callback }) => {
  return (
    <TouchableOpacity style={styles.listItem}>
      <View style={styles.listItemView}>
        <Text style={styles.listItemText}>{item.name}</Text>
        <View style={styles.listItemButtons}>
          {item.value === null ? (
            <Icon name={"remove"} size={30} color={"firebrick"} />
          ) : (
            <Icon name={"check"} size={30} color={"green"} />
          )}
        </View>
      </View>
      <View style={styles.listItemBody}>
        <Text style={styles.listItemText}>Test123</Text>
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
  listItemBody: {
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

export default JobListItem;

/*

interface Props {
  job: Job;
}
interface State {
  job: Job;
}

class TaskDetailObject extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      task: props.task
    }
  }

  renderType() {
    switch (this.props.task.type) {
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
        // https://github.com/react-native-image-picker/react-native-image-picker
        return (
          <>
            <Text style={styles.textHeader}>{this.state.data.name}</Text>
            <Text style={styles.text}>{this.state.data.text}</Text>
            {this.state.data.value === "" ? (
              <Button
                onPress={this.onPressImageUpload.bind(this)}
                title="Upload Image"
                color="#841584"
              />
            ) : (
              <Image
                fadeDuration={1000}
                resizeMode={'contain'}
                source={{ uri: this.state.data.value }}
                style={styles.image}
              />
            )}
          </>
        );
    }
  }

  async onPressImageUpload() {
    const result = await launchCamera({
      mediaType: 'photo',
      maxWidth: 2000,
      maxHeight: 2000,
      cameraType: 'back',
    });

    if (result.errorMessage != undefined) {
      Alert.alert(
        "Error",
        result.errorMessage,
        [
          { text: "OK" },
        ]
      );
    }

    if (result.assets) {
      this.state.data.value = result.assets[0].uri as string;
      this.setState({
        data: this.state.data
      });
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
  image: {
    height: 300,
  },
});

export default TaskDetailObject;*/