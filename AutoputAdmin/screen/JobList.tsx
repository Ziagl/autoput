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

class JobList extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.init();
    }

    async init() {
        await Api.getInstance().fetchJobs();
    }


    render() {
        return (
            <SafeAreaView style={styles.container}>

            </SafeAreaView>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
});

export default JobList;