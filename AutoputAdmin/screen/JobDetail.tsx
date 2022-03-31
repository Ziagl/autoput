import React from 'react';
import {
  SafeAreaView,
  ImageBackground,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown'
import Icon from 'react-native-vector-icons/FontAwesome';

import { Api, Job } from '../Api';
import styles from '../Style';

// components
import Loader from '../components/Loader'

interface Props {
  navigation: any,
  route: any,
}
interface State {
  job: Job,
  loading: boolean
}

class JobDetail extends React.Component<Props, State> {
  private _types: string[] = ["Text", "Yes/No", "Image"];

  constructor(props: Props) {
    super(props);

    this.state = {
      job: { id: props.route.params.id, name: "", type: 0, text: "", value: "" },
      loading: props.route.params.id === 0 ? false : true,
    }
    if (props.route.params.id != 0) {
      this.init();
    }
  }

  async init() {
    var job = await Api.getInstance().fetchJob(this.props.route.params.id);
    this.setState({ job: job, loading: false });
  }

  onChangeName = textValue => this.setState(
    { job: { ...this.state.job, name: textValue } }
  );
  onChangeText = textValue => this.setState(
    { job: { ...this.state.job, text: textValue } }
  );
  onChangeValue = textValue => this.setState(
    { job: { ...this.state.job, value: textValue } }
  );

  onSave = () => {
    if (this.state.job.id == 0 || this.state.job.id == undefined) {
      Api.getInstance().addJob(this.state.job);
    }
    else {
      Api.getInstance().updateJob(this.state.job);
    }
    this.props.navigation.navigate("JobList");
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Loader visible={this.state.loading} />
        <ImageBackground
          source={require('../assets/login.jpg')}
          resizeMode="stretch"
          style={styles.img}>
          <ScrollView style={styles.detailScrollView}>
            <Text style={styles.text}>Name:</Text>
            <TextInput placeholder="Name" placeholderTextColor={styles.placeholderTextColor.color} style={styles.input} value={this.state.job.name} onChangeText={this.onChangeName} />
            <Text style={styles.text}>Type:</Text>
            <SelectDropdown
              data={this._types}
              defaultValueByIndex={this.state.job.type}
              dropdownIconPosition="right"
              buttonStyle={styles.dropdownButton}
              renderDropdownIcon={(isOpened) => {
                return (
                  <Icon
                    style={styles.dropdownIconColor}
                    name={isOpened ? "chevron-up" : "chevron-down"}
                    size={18}
                  />
                );
              }}
              onSelect={(selectedItem, index) => console.log(selectedItem, index)}
              buttonTextAfterSelection={(selectedItem, index) => {
                // text represented after item is selected
                // if data array is an array of objects then return selectedItem.property to render after item is selected
                this.state.job.type = index;
                return selectedItem
              }}
              rowTextForSelection={(item, index) => {
                // text represented for each item in dropdown
                // if data array is an array of objects then return item.property to represent item in dropdown
                return item
              }}
            />
            <Text style={styles.text}>Text:</Text>
            <TextInput
              placeholder="Text"
              multiline
              placeholderTextColor={styles.placeholderTextColor.color}
              style={styles.input}
              value={this.state.job.text}
              onChangeText={this.onChangeText} />
            <Text style={styles.text}>Value:</Text>
            <TextInput
              placeholder="Value"
              multiline
              placeholderTextColor={styles.placeholderTextColor.color}
              style={styles.input} value={this.state.job.value}
              onChangeText={this.onChangeValue} />
          </ScrollView>
          <TouchableOpacity style={styles.btn} onPress={() => this.onSave()}>
            <Text style={styles.btnText}><Icon name="save" size={30} /> Save</Text>
          </TouchableOpacity>
        </ImageBackground>
      </SafeAreaView>
    );
  }
};

export default JobDetail;