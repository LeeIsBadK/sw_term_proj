import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Stack } from "expo-router";
// import { createNativeStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// import HomeScreen from './tabs/HomeScreen';
// import ProfileScreen from './tabs/ProfileScreen';
// import SettingsScreen from './tabs/SettingsScreen';  


// const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// const TabNavigator = () => {
//     return (
//         <Tab.Navigator>
//             <Tab.Screen name="Home" component={HomeScreen} />
//             {/* <Tab.Screen name="Profile"  
//  component={ProfileScreen} />
//             <Tab.Screen name="Settings" component={SettingsScreen} /> */}
//         </Tab.Navigator>  

//     );
// };

const Layout = () => {
    return (
        <Stack>
          <Stack.Screen name="LoginScreen" options={{ headerShown: false }} />
          <Stack.Screen name="tabs" options={{ headerShown: false }} />
        </Stack>

        // <NavigationContainer>
        //     <Stack.Navigator>
        //         {/* Other screens like LoginScreen, etc. */}
        //         <Stack.Screen name="index" options={{ headerShown: false }} />
        //         <Stack.Screen name="Main" component={TabNavigator} options={{ headerShown: false }} />
        //     </Stack.Navigator>
        // </NavigationContainer>
    );
};

// export default Layout;

// import { Stack } from "expo-router";

// export default function RootLayout() {
//   return (
//     <Stack>
//       <Stack.Screen name="index" options={{ headerShown: false }} />
//       <Stack.Screen name="tabs" options={{ headerShown: false }} />
//     </Stack>
//   );
// }
