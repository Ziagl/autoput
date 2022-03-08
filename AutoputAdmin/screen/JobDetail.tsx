import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ActivityIndicator,
    Image,
    Dimensions,
    Text,
    TextInput,
    TouchableOpacity,
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown'
import Icon from 'react-native-vector-icons/FontAwesome';

import { Api, Job } from '../Api';
import styles from '../Style';

interface Props {
    navigation: any,
}
interface State {
    job: Job
}

class JobDetail extends React.Component<Props, State> {
    private _types: string[] = ["Text", "Yes/No", "Image"];

    constructor(props: Props) {
        super(props);

        this.state = {
            job: { id: props.navigation.params.id, name: "", type: 0, text: "", value: "" },
        }
        console.log(props.navigation.params.id);
        if (props.navigation.params.id != null) {
            this.init();
        }
    }

    async init() {
        this.setState({ job: await Api.getInstance().fetchJob(this.props.navigation.params.id) });
    }

    onChangeName = textValue => this.state.job.name = textValue;
    onChangeText = textValue => this.state.job.text = textValue;
    onChangeValue = textValue => this.state.job.value = textValue;

    onSave = () => {
        console.log(this.state.job.id);
        if (this.state.job.id == 0 || this.state.job.id == undefined) {
            Api.getInstance().addJob(this.state.job);
            this.props.navigation.navigate("JobList");
        }
        else {
            console.log("update job");
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.text}>Name</Text>
                <TextInput placeholder="Name" style={styles.input} onChangeText={this.onChangeName} />
                <Text style={styles.text}>Type</Text>
                <SelectDropdown
                    data={this._types}
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
                <Text style={styles.text}>Text</Text>
                <TextInput placeholder="Text" style={styles.input} onChangeText={this.onChangeText} />
                <Text style={styles.text}>Value</Text>
                <TextInput placeholder="Value" style={styles.input} onChangeText={this.onChangeValue} />

                <TouchableOpacity style={styles.btn} onPress={() => this.onSave()}>
                    <Text style={styles.btnText}><Icon name="plus" size={20} /> New Job</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }
};

export default JobDetail;