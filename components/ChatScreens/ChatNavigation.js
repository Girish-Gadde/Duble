import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import ChatListScreen from '../ChatScreens/ChatList';
import MatchScreen from '../MatchesScreens/MatchScreen';
import ChatList from '../ChatScreens/ChatList'
import Profile from '../Profile';
import Chat1 from './ChatScreen'

const Stack = createStackNavigator();

const App = () => (
  <NavigationContainer independent='true'>
    <Stack.Navigator>
      <Stack.Screen name="ChatList" component={MatchScreen} />
      <Stack.Screen name="ChatScreen" component={Chat1} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default App;
