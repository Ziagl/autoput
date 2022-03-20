import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ActivityIndicator,
    Image,
    Dimensions,
    RefreshControl,
    FlatList,
    Text,
    TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Api, Job } from '../Api';
import styles from '../Style';

// components
import ListItem from '../components/ListItem'

interface Props {
    navigation: any,
}
interface State {
    jobs: Job[],
    refreshing: boolean,
}

class JobList extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            jobs: [],
            refreshing: false,
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
        // remove item by api call from database
        Api.getInstance().deleteJob(id);
        // remove item from local state to force a reload
        let index = this.state.jobs.findIndex((job) => {
            if (job.id == id) {
                return true;
            }
            return false;
        });
        this.state.jobs.splice(index, 1);
        this.setState({ jobs: this.state.jobs });
    }

    wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }

    onAddJob = () => {
        this.props.navigation.navigate("JobDetail", { id: 0 });
    }

    onRefresh = () => {
        this.setState({ refreshing: true });
        this.wait(2000)
            .then(() => {
                this.setState({ refreshing: false });
                this.init();
            });
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <FlatList
                    data={this.state.jobs}
                    renderItem={({ item }) => <ListItem item={item} editItem={this.onEditJob} deleteItem={this.onDeleteJob} />}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            onRefresh={this.onRefresh}
                        />
                    }
                />
                <TouchableOpacity style={styles.btn} onPress={() => this.onAddJob()}>
                    <Text style={styles.btnText}><Icon name="plus" size={20} /> New Job</Text>
                </TouchableOpacity>
            </SafeAreaView>
        );
    }
};

export default JobList;