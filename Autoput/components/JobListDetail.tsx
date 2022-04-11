import React from 'react';
import { Text, StyleSheet, Button, Image, Alert } from 'react-native';
import CheckBox from 'react-native-check-box';
import { launchCamera } from 'react-native-image-picker';

import { Api, Job } from '../Api';

interface Props {
  item: Job,
  callback: Function,
}
interface State {
  job: Job,
}

class JobListDetail extends React.Component<Props, State>{
  constructor(props: Props) {
    super(props);

    this.state = {
      job: this.props.item,
    }
  }

  saveValue = (value: string) => {
    this.setState(
      { job: { ...this.state.job, value: value } },
      () => this.props.callback(value)
    );

  }

  /*
   * image job callback
   */
  async onPressImageUpload() {
    const result = await launchCamera({
      mediaType: 'photo',
      maxWidth: 2000,
      maxHeight: 2000,
      cameraType: 'back',
      includeBase64: true,
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
      this.saveValue(await Api.getInstance().uploadPhoto(result.assets[0]));
    }
  }

  render() {
    switch (this.props.item.type) {
      case 0: //text
        if (this.props.item.value === null) {
          setTimeout(() => this.saveValue('ok'), 5000);
        }
        return (
          <>
            <Text style={styles.textHeader}>{this.props.item.name}</Text>
            <Text style={styles.text}>{this.props.item.text}</Text>
          </>
        );
      case 1: //bool
        // https://github.com/crazycodeboy/react-native-check-box
        return (
          <>
            <Text style={styles.textHeader}>{this.props.item.name}</Text>
            <CheckBox
              style={styles.checkbox}
              rightTextStyle={styles.checkboxText}
              rightText={this.props.item.text}
              isChecked={this.state.job.value === 'true'}
              onClick={() => {
                if (this.state.job.value != 'true') {
                  this.saveValue('true');
                }
                else {
                  this.saveValue('false');
                }
              }}
            />
          </>
        );
      case 2: //image
        // https://github.com/react-native-image-picker/react-native-image-picker
        return (
          <>
            <Text style={styles.textHeader}>{this.props.item.name}</Text>
            <Text style={styles.text}>{this.props.item.text}</Text>
            {this.state.job.value === null ? (
              <Button
                onPress={this.onPressImageUpload.bind(this)}
                title="Upload Image"
                color="#ee162a"
              />
            ) : (
              <Image
                fadeDuration={1000}
                resizeMode={'contain'}
                source={{ uri: this.state.job.value }}
                style={styles.image}
              />
            )}
          </>
        );
      default:
        return (
          <Text style={styles.text}>unknown type</Text>
        );
    }
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

export default JobListDetail;
