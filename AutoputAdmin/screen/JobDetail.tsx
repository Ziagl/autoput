import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ActivityIndicator,
    Image,
    Dimensions,
    Text,
} from 'react-native';

import { Api, Job } from '../Api';

interface Props { }
interface State {
    jobs: Job[]
}

class JobDetail extends React.Component<Props, State> {
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


    render() {
        return (
            <SafeAreaView style={styles.container}>
                {this.state.jobs.map(job => (
                    <Text style={styles.text}>{job.name}</Text>
                ))}
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
});

export default JobDetail;