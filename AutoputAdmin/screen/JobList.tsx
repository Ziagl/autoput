import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ActivityIndicator,
    Image,
    Dimensions,
    FlatList,
    Text,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Api, Job } from '../Api';

// components
import ListItem from '../components/ListItem'

interface Props {
    navigation: any,
}
interface State {
    jobs: Job[]
}

class JobList extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            jobs: [],
        }
        this.init();
    }

    async init() {
        this.setState({ jobs: await Api.getInstance().fetchJobs() });
    }

    onEditJob = (id) => {
        console.log("edit job called with id " + id);
        this.props.navigation.navigate("JobDetail", { id: id });
    }

    onDeleteJob = (id) => {
        console.log("delete job called with id: " + id);
    }

    onAddJob = () => {
        console.log("add job called");
        this.props.navigation.navigate("JobDetail", { id: 0 });
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={this.state.jobs}
                    renderItem={({ item }) => <ListItem item={item} editItem={this.onEditJob} deleteItem={this.onDeleteJob} />}
                />
                <TouchableOpacity style={styles.btn} onPress={() => this.onAddJob()}>
                    <Text style={styles.btnText}><Icon name="plus" size={20} /> New Job</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    text: {
        color: 'black',
        fontSize: 23,
        textAlign: 'center',
    },
    btn: {
        backgroundColor: '#c2bad8',
        padding: 9,
        margin: 5,
    },
    btnText: {
        color: 'darkslateblue',
        fontSize: 20,
        textAlign: 'center',
    },
});

export default JobList;