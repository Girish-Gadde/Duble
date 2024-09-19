import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import ChatListScreen from '../ChatScreens/ChatList';
//import ChatScreen from './ChatStore';
import ChatScreen from '../ChatScreens/ChatScreen'
import MatchScreen from '../MatchesScreens/MatchScreen';
import ChatList from '../ChatScreens/ChatList'
import Profile from '../Profile';

const Stack = createStackNavigator();

const App = () => (
  <NavigationContainer independent='true'>
    <Stack.Navigator>
      <Stack.Screen name="ChatList" component={MatchScreen} />
      <Stack.Screen name="ChatScreen" component={ChatScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
