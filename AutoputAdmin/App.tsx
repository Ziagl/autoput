import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// screens
import Login from './screen/Login';
import TaskList from './screen/TaskList';
import JobList from './screen/JobList';

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
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={Login}
          />
          <Stack.Screen
            name="TaskList"
            component={TaskList}
          />
          <Stack.Screen
            name="JobList"
            component={JobList}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};

export default App;