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

import { Api, Task } from '../Api';

interface Props {
    id: number | null
}
interface State {
    //task: Task
}

class TaskDetail extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            task: { id: 0, name: "", type: 0, text: "", value: "" },
        }
        if (props.id != null) {
            this.init();
        }
    }

    async init() {
        //this.setState({ task: await Api.getInstance().fetchTask(this.props.id) });
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
        backgroundColor: 'white',
    },

});

export default TaskDetail;