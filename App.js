import HomeScreen from "./screens/HomeScreen";
import NewEntryScreen from "./screens/NewEntryScreen";
import ViewEntryScreen from "./screens/ViewEntryScreen";
import NewSetScreen from "./screens/NewSetScreen";
import { EntryItem } from "./EntryItem";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="New Entry"
          component={NewEntryScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="View Entry"
          component={ViewEntryScreen}
          options={{ headerShown: false, gestureEnabled: false }}
        />
        <Stack.Screen
          name="New Set"
          component={NewSetScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Entry Item"
          component={EntryItem}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
