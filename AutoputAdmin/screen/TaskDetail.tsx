import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ActivityIndicator,
    Image,
    Dimensions,
    Text,
    TextInput,
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown'
import Icon from 'react-native-vector-icons/FontAwesome';
import AnimatedLoader from "react-native-animated-loader";
import { TimePicker, ValueMap } from 'react-native-simple-time-picker';

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
            task: { id: props.route.params.id, name: "", duedate: "", duetime: "", enddate: "", endtime: "", date_recurrency: 0, time_recurrency: 0 },
            loading: props.route.params.id === 0 ? false : true,
        }
        if (props.route.params.id != 0) {
            this.init();
        }
    }

    onChangeName = textValue => this.setState(
        { task: { ...this.state.task, name: textValue } }
    );
    onChangeDuedate = textValue => this.setState(
        { task: { ...this.state.task, duedate: textValue } }
    );
    /*onChangeDuetime = textValue => this.setState(
        { task: { ...this.state.task, duetime: textValue } }
    );*/
    onChangeEnddate = textValue => this.setState(
        { task: { ...this.state.task, enddate: textValue } }
    );
    /*onChangeEndtime = textValue => this.setState(
        { task: { ...this.state.task, endtime: textValue } }
    );*/

    async init() {
        var task = await Api.getInstance().fetchTask(this.props.route.params.id);
        this.setState({ task: task, loading: false });
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
                <Text style={styles.text}>Name</Text>
                <TextInput placeholder="Name" placeholderTextColor={styles.input.placeholderTextColor} style={styles.input} value={this.state.task.name} onChangeText={this.onChangeName} />
                <Text style={styles.text}>Duedate</Text>
                <TextInput placeholder="01-01-2022" placeholderTextColor={styles.input.placeholderTextColor} style={styles.input} value={this.state.task.duedate} onChangeText={this.onChangeDuedate} />
                <Text style={styles.text}>Duetime</Text>
                <TimePicker
                    defaultValue={{
                        hours: parseInt(this.state.task.duetime.split(":")[0]),
                        minutes: parseInt(this.state.task.duetime.split(":")[1]),
                        seconds: 0
                    }}
                    pickerShows={["hours", "minutes"]}
                    minutesInterval={15}
                    textColor={styles.timePickerColor.color}
                    itemStyle={styles.timePickerItemStyle}
                    onChange={(value: ValueMap) => {
                        this.setState({ task: { ...this.state.task, duetime: value.hours + ":" + value.minutes } });
                    }}
                />
                <Text style={styles.text}>Enddate</Text>
                <TextInput placeholder="01-01-2022" placeholderTextColor={styles.input.placeholderTextColor} style={styles.input} value={this.state.task.enddate} onChangeText={this.onChangeEnddate} />
                <Text style={styles.text}>Endtime</Text>
                <TimePicker
                    defaultValue={{
                        hours: parseInt(this.state.task.endtime.split(":")[0]),
                        minutes: parseInt(this.state.task.endtime.split(":")[1]),
                        seconds: 0
                    }}
                    pickerShows={["hours", "minutes"]}
                    minutesInterval={15}
                    textColor={styles.timePickerColor.color}
                    itemStyle={styles.timePickerItemStyle}
                    onChange={(value: ValueMap) => {
                        this.setState({ task: { ...this.state.task, endtime: value.hours + ":" + value.minutes } });
                    }}
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
            </SafeAreaView>
        );
    }
};

export default TaskDetail;