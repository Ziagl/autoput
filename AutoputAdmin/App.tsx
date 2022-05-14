import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// screens
import Login from './screen/Login';
import TaskList from './screen/TaskList';
import TaskDetail from './screen/TaskDetail';
import JobList from './screen/JobList';
import JobDetail from './screen/JobDetail';
import TaskJobs from './screen/TaskJobs';
import Settings from './screen/Settings';

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
            options={{ headerTitle: "Tasks" }}
          />
          <Stack.Screen
            name="TaskDetail"
            component={TaskDetail}
            options={{ headerTitle: "Task Details" }}
          />
          <Stack.Screen
            name="JobList"
            component={JobList}
            options={{ headerTitle: "Jobs" }}
          />
          <Stack.Screen
            name="JobDetail"
            component={JobDetail}
            options={{ headerTitle: "Job Details" }}
          />
          <Stack.Screen
            name="TaskJobs"
            component={TaskJobs}
            options={{ headerTitle: "Tasks and Jobs" }}
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