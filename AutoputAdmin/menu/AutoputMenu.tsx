import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import Icon from 'react-native-vector-icons/FontAwesome';

// styles
import styles from '../Style';

interface Props {
  menuText: string,
  navigation: any,
  route: any,
  isIcon: boolean,
}
interface State {
  isVisible: boolean,
}

class AutoputMenu extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      isVisible: false
    }
  }

  hideMenu = () => { this.setState({ isVisible: false }) }
  showMenu = () => { this.setState({ isVisible: true }) }

  render() {
    let _menu = null;

    return (
      <View style={styles.menu}>
        <Menu
          visible={this.state.isVisible}
          anchor={
            this.props.isIcon ? (
              <TouchableOpacity onPress={this.showMenu}>
                <Text style={styles.menuText}><Icon name="bars" size={28} /></Text>
              </TouchableOpacity>
            ) : (
              <Text onPress={this.showMenu} style={styles.menuText}>{this.props.menuText}</Text>
            )
          }
          onRequestClose={this.hideMenu}
          style={styles.menu}
        >
          <MenuItem
            onPress={() => {
              this.props.navigation.navigate('JobList');
              this.hideMenu();
            }}
            textStyle={styles.menuText}>
            Jobs
          </MenuItem>
          <MenuItem
            onPress={() => {
              this.props.navigation.navigate('TaskList');
              this.hideMenu();
            }}
            textStyle={styles.menuText}>
            Tasks
          </MenuItem>
          <MenuDivider />
          <MenuItem
            onPress={() => {
              this.props.navigation.navigate('Login');
              this.hideMenu();
            }}
            textStyle={styles.menuText}>
            Logout
          </MenuItem>
        </Menu>
      </View >
    );
  }
};

export default AutoputMenu;