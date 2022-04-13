import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// screens
import Home from './screen/Home';
import TaskList from './screen/TaskList';
import TaskDetail from './screen/TaskDetail';
import Settings from './screen/Settings';

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
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="TaskList"
            component={TaskList}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="TaskDetail"
            component={TaskDetail}
          />
          <Stack.Screen
            name="Settings"
            component={Settings}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};

export default App;