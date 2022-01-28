import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// screens
import Home from './screen/Home';
import TaskList from './screen/TaskList';
import TaskDetail from './screen/TaskDetail';

const Stack = createNativeStackNavigator();

interface Props { }
interface State { }

class App extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName="TaskList">
          <Stack.Screen
            name="Home"
            component={Home}
          />
          <Stack.Screen
            name="TaskList"
            component={TaskList}
          />
          <Stack.Screen
            name="TaskDetail"
            component={TaskDetail}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};

export default App;