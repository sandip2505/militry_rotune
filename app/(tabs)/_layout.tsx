import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#FF6B35',
        tabBarInactiveTintColor: '#666',
        tabBarStyle: {
          backgroundColor: '#FFF',
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 4,
          paddingVertical: 5,
          height: 65,
        },
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '600',
          marginTop: 4,
        },
        headerStyle: {
          backgroundColor: '#FF6B35',
          elevation: 0,
        },
        headerTintColor: '#FFF',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'TODAY',
          tabBarIcon: ({ color }) => <Ionicons name="today-outline" size={24} color={color} />,
          headerTitle: '🚀 SANDIP\'S MILITARY DISCIPLINE',
        }}
      />
      <Tabs.Screen
        name="rules"
        options={{
          title: 'RULES',
          tabBarIcon: ({ color }) => <Ionicons name="shield-outline" size={24} color={color} />,
          headerTitle: '⚡ MILITARY RULES',
        }}
      />
      <Tabs.Screen
        name="goals"
        options={{
          title: 'GOALS',
          tabBarIcon: ({ color }) => <Ionicons name="trophy-outline" size={24} color={color} />,
          headerTitle: '🎯 WEEKLY TARGETS',
        }}
      />
      <Tabs.Screen
        name="motivation"
        options={{
          title: 'MOTIVATION',
          tabBarIcon: ({ color }) => <Ionicons name="flame-outline" size={24} color={color} />,
          headerTitle: '🔥 WARRIOR MINDSET',
        }}
      />
    </Tabs>
  );
}