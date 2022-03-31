import React from 'react';
import {
  SafeAreaView,
  ImageBackground,
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
import Loader from '../components/Loader'

interface Props {
  navigation: any,
}
interface State {
  jobs: Job[],
  loading: boolean,
  refreshing: boolean,
}

class JobList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      jobs: [],
      loading: true,
      refreshing: false,
    }
    this.init();
  }

  async init() {
    var jobs = await Api.getInstance().fetchJobs();
    this.setState({ jobs: jobs, loading: false, refreshing: false });
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

  onAddJob = () => {
    this.props.navigation.navigate("JobDetail", { id: 0 });
  }

  onRefresh = () => {
    this.setState({ refreshing: true });
    this.init();
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Loader visible={this.state.loading} />
        <ImageBackground
          source={require('../assets/login.jpg')}
          resizeMode="stretch"
          style={styles.img}>
          <FlatList
            data={this.state.jobs}
            renderItem={({ item }) => <ListItem item={item} functions={[{ callback: this.onEditJob, icon: "edit", color: "green" }, { callback: this.onDeleteJob, icon: "remove", color: "firebrick" }]} />}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh}
              />
            }
          />
          <TouchableOpacity style={styles.btn} onPress={() => this.onAddJob()}>
            <Text style={styles.btnText}><Icon name="plus" size={30} /> New Job</Text>
          </TouchableOpacity>
        </ImageBackground>
      </SafeAreaView>
    );
  }
};

export default JobList;