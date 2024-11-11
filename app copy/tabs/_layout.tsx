import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const iconSize = 15;

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'black',
        tabBarActiveBackgroundColor: '#3FC385',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#98E6AE',
          height: 60, // Increase the height of the tab bar
        },
        tabBarIconStyle: {
          marginBottom: 1, // Add some margin to the bottom of the icon
        },
        tabBarLabelPosition: 'below-icon',
      }}>
      <Tabs.Screen
        name="HomeScreen"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'}/>
          ),
        }}
        
      />
      <Tabs.Screen
        name="TaxScreen"
        options={{
          title: 'Tax',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'document' : 'document-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="AddScreen"
        options={{
          title: 'Add',
          tabBarIcon: ({ color, focused }) => (
            // <TabBarIcon name={focused ? 'person' : 'person-outline'} color={color} />
            <>
              <TabBarIcon name={focused ? 'square' : 'square-outline'} color={color} />
              <TabBarIcon name="add" size={16} color={focused ? '#3FC385' : color} style={{ position: 'absolute', right: 5, top: 15 }} />
            </>
          ),
        }}
      />
      <Tabs.Screen
        name="DocScreen"
        options={{
          title: 'Documents',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'folder' : 'folder-outline'} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="ProfileScreen"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'person' : 'person-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
