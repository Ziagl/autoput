import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { Api, Job } from '../Api';
import JobListDetail from './JobListDetail'

interface Props {
  item: Job,
  callback: Function,
}
interface State {
  job: Job,
}

class JobListItem extends React.Component<Props, State>{
  constructor(props: Props) {
    super(props);

    this.state = {
      job: this.props.item,
    }
  }

  saveValue = (value: string) => {
    if (this.state.job.value != value) {
      // save value on local state
      this.setState(
        { job: { ...this.state.job, value: value } }
      );
      // save value to database
      Api.getInstance().saveJob(this.state.job.id, value);
    }
  }

  render() {
    return (
      <TouchableOpacity style={styles.listItem}>
        <View style={styles.listItemView}>
          <Text style={styles.listItemText}>{this.props.item.name}</Text>
          <View style={styles.listItemButtons}>
            {(this.state.job.value === null || this.state.job.value === 'false') ? (
              <Icon name={"remove"} size={30} color={"firebrick"} />
            ) : (
              <Icon name={"check"} size={30} color={"green"} />
            )}
          </View>
        </View>
        <View style={styles.listItemBody}>
          <JobListDetail item={this.props.item} callback={this.saveValue} />
        </View>
      </TouchableOpacity>
    );
  }

};

const styles = StyleSheet.create({
  listItem: {
    padding: 15,
    backgroundColor: '#f8f8f8aa',
    borderBottomWidth: 2,
    borderColor: '#000000aa',
  },
  listItemView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listItemBody: {
    justifyContent: 'space-between',
    //alignItems: 'left',
  },
  listItemButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  listItemText: {
    color: 'black',
    fontSize: 20,
    fontWeight: "500",
  },
});

export default JobListItem;
