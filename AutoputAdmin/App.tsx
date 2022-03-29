import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// screens
import Login from './screen/Login';
import TaskList from './screen/TaskList';
import TaskDetail from './screen/TaskDetail';
import JobList from './screen/JobList';
import JobDetail from './screen/JobDetail';

// menu
import AutoputMenu from './menu/AutoputMenu';

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
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={({ route, navigation }) => ({
            headerRight: () => (
              route.name === "TaskList" || route.name === "JobList" ?
                <AutoputMenu
                  menuText="Menu"
                  navigation={navigation}
                  route={route}
                  isIcon={true}
                /> : null
            ),
          })}>
          <Stack.Screen
            name="Login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="TaskList"
            component={TaskList}
          />
          <Stack.Screen
            name="TaskDetail"
            component={TaskDetail}
          />
          <Stack.Screen
            name="JobList"
            component={JobList}
          />
          <Stack.Screen
            name="JobDetail"
            component={JobDetail}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
};

export default App;