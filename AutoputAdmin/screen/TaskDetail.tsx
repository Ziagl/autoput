import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
  Image,
  Dimensions,
  TouchableOpacity,
  Text,
  TextInput,
  ScrollView,
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown'
import Icon from 'react-native-vector-icons/FontAwesome';
import AnimatedLoader from "react-native-animated-loader";
import DatePicker from 'react-native-date-picker'

import { Api, Task } from '../Api';
import styles from '../Style';

interface Props {
  navigation: any,
  route: any,
}
interface State {
  task: Task,
  loading: boolean
}

class TaskDetail extends React.Component<Props, State> {
  private _dateRecurrencies: string[] = ["exact date", "same day of week", "every day"];
  private _timeRecurrencies: string[] = ["exact time", "every hour from time", "every 2 hours from time", "every 3 hours from time"];

  constructor(props: Props) {
    super(props);

    this.state = {
      task: { id: props.route.params.id, name: "", duedate: "2022-01-01 00:00:00", enddate: "2022-01-01 00:00:00", date_recurrency: 0, time_recurrency: 0 },
      loading: props.route.params.id === 0 ? false : true,
    }
    if (props.route.params.id != 0) {
      this.init();
    }
  }

  onChangeName = textValue => this.setState(
    { task: { ...this.state.task, name: textValue } }
  );

  async init() {
    var task = await Api.getInstance().fetchTask(this.props.route.params.id);
    this.setState({ task: task, loading: false });
  }

  dbDateToDate(date: string): Date {
    var t = date.split(/[- :]/);
    console.log(t);
    return new Date(
      parseInt(t[0]),
      parseInt(t[1]) - 1,
      parseInt(t[2]),
      parseInt(t[3]),
      parseInt(t[4]),
      parseInt(t[5])
    );
  }

  dateToDbDate(date: Date): string {
    return date.getFullYear() + "-" +
      (date.getMonth() + 1).toString().padStart(2, '0') + "-" +
      date.getDate().toString().padStart(2, '0') + " " +
      date.getHours().toString().padStart(2, '0') + ":" +
      date.getMinutes().toString().padStart(2, '0') + ":" +
      date.getSeconds().toString().padStart(2, '0');
  }

  onSave = () => {
    console.log(this.state.task.id);
    if (this.state.task.id == 0 || this.state.task.id == undefined) {
      Api.getInstance().addTask(this.state.task);
      this.props.navigation.navigate("TaskList");
    }
    else {
      console.log("update task");
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <AnimatedLoader
          visible={this.state.loading}
          overlayColor="rgba(255,255,255,0.75)"
          source={require("../loader.json")}
          animationStyle={styles.loader}
          speed={1}
        >
          <Text style={styles.text}>Doing something...</Text>
        </AnimatedLoader>
        <ScrollView>
          <Text style={styles.text}>Name</Text>
          <TextInput placeholder="Name" placeholderTextColor={styles.placeholderTextColor.color} style={styles.input} value={this.state.task.name} onChangeText={this.onChangeName} />
          <Text style={styles.text}>Duedate</Text>
          <DatePicker
            date={this.dbDateToDate(this.state.task.duedate)}
            onDateChange={(date: Date) => {
              this.setState({ task: { ...this.state.task, duedate: this.dateToDbDate(date) } })
            }}
            mode="datetime"
            textColor="black"
            minimumDate={new Date()}
            maximumDate={new Date("2023-01-01")}
            minuteInterval={15}
          />
          <Text style={styles.text}>Enddate</Text>
          <DatePicker
            date={this.dbDateToDate(this.state.task.enddate)}
            onDateChange={(date: Date) => {
              this.setState({ task: { ...this.state.task, enddate: this.dateToDbDate(date) } })
            }}
            mode="datetime"
            textColor="black"
            minimumDate={new Date()}
            maximumDate={new Date("2023-01-01")}
            minuteInterval={15}
          />
          <Text style={styles.text}>Date recurrency</Text>
          <SelectDropdown
            data={this._dateRecurrencies}
            defaultValueByIndex={this.state.task.date_recurrency}
            dropdownIconPosition="right"
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
              this.state.task.date_recurrency = index;
              return selectedItem
            }}
            rowTextForSelection={(item, index) => {
              // text represented for each item in dropdown
              // if data array is an array of objects then return item.property to represent item in dropdown
              return item
            }}
          />
          <Text style={styles.text}>Time recurrency</Text>
          <SelectDropdown
            data={this._timeRecurrencies}
            defaultValueByIndex={this.state.task.time_recurrency}
            dropdownIconPosition="right"
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
              this.state.task.time_recurrency = index;
              return selectedItem
            }}
            rowTextForSelection={(item, index) => {
              // text represented for each item in dropdown
              // if data array is an array of objects then return item.property to represent item in dropdown
              return item
            }}
          />
        </ScrollView>
        <TouchableOpacity style={styles.btn} onPress={() => this.onSave()}>
          <Text style={styles.btnText}><Icon name="save" size={20} /> Save</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
};

export default TaskDetail;