import { Tabs } from 'expo-router';
import React from 'react';

import { TabBarIcon } from '@/components/navigation/TabBarIcon';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Ionicons } from '@expo/vector-icons';

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
        tabBarLabelStyle: {
          fontFamily: 'Kanit',
          marginBottom: 4,
        },
        tabBarIconStyle: {
          marginBottom: 1, // Add some margin to the bottom of the icon
        },
        tabBarLabelPosition: 'below-icon',
      }}>
      <Tabs.Screen
        name="HomeScreen"
        options={{
          title: 'หน้าหลัก',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon name={focused ? 'home' : 'home-outline'}/>
          ),
        }}
        
      />
      <Tabs.Screen
        name="TaxScreen"
        options={{
          title: 'ภาษี',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'document' : 'document-outline'} color={color} size={25}/>
          ),
        }}
      />
      <Tabs.Screen
        name="AddScreen"
        options={{
          title: 'เพิ่ม',
          tabBarIcon: ({ color, focused }) => (
            // <TabBarIcon name={focused ? 'person' : 'person-outline'} color={color} />
            <Ionicons name={focused ? 'add-circle' : 'add-circle-outline'} color={color} size={25}/>
          ),
        }}
      />
      <Tabs.Screen
        name="DocScreen"
        options={{
          title: 'เอกสาร',
          tabBarIcon: ({ color, focused }) => (
            <Ionicons name={focused ? 'folder' : 'folder-outline'} color={color} size={25}/>
          ),
        }}
      />
      <Tabs.Screen
        name="ProfileScreen"
        options={{
          title: 'โปรไฟล์',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'person' : 'person-outline'} color={color} />
          ),
        }}
        
      />
      <Tabs.Screen
        name="file_upload"
        options={{
          title: 'File Upload',
          tabBarIcon: ({ color, focused }) => (
            <TabBarIcon name={focused ? 'cloud-upload' : 'cloud-upload-outline'} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
