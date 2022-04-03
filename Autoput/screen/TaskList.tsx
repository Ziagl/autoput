import React from 'react';
import {
  SafeAreaView,
  FlatList,
  ImageBackground,
  RefreshControl,
} from 'react-native';
import TaskDetail from './TaskDetail';

import { Api, ListElement } from '../Api';
import styles from '../Style';

// components
import ListItem from '../components/ListItem'

interface Props {
  navigation: any,
}
interface State {
  list: ListElement[],
  refreshing: boolean,
}

class TaskList extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      list: [],
      refreshing: false,
    }
    this.init();
  }

  async init() {
    this.setState({ list: await Api.getInstance().getData(), refreshing: false });
  }

  onRefresh = () => {
    this.setState({ refreshing: true });
    this.init();
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={require('../assets/login.jpg')}
          resizeMode="stretch"
          style={styles.img}>
          <FlatList
            data={this.state.list}
            renderItem={({ item }) => <ListItem item={item} functions={[]} />}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.onRefresh}
              />
            }
          />
        </ImageBackground>
      </SafeAreaView>
    );
  }
};

export default TaskList;