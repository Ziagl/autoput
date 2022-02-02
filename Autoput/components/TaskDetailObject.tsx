import React from 'react';
import { View, Text, StyleSheet, Button, Image, Alert } from 'react-native';
import CheckBox from 'react-native-check-box';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { TaskDetails } from '../data/Metadata';

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

export default TaskDetailObject;