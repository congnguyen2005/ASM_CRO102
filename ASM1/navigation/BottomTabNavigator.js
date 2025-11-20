import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import ProductsScreen from '../screens/ProductsScreen';
import OrdersScreen from '../screens/OrdersScreen';
import CustomersScreen from '../screens/CustomersScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen 
        name="Products" 
        component={ProductsScreen} 
        options={{ tabBarIcon: ({ color, size }) => <Ionicons name="pricetag" size={size} color={color} /> }} 
      />
      <Tab.Screen 
        name="Orders" 
        component={OrdersScreen} 
        options={{ tabBarIcon: ({ color, size }) => <Ionicons name="cart" size={size} color={color} /> }} 
      />
      <Tab.Screen 
        name="Customers" 
        component={CustomersScreen} 
        options={{ tabBarIcon: ({ color, size }) => <Ionicons name="people" size={size} color={color} /> }} 
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileScreen} 
        options={{ tabBarIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color} /> }} 
      />
    </Tab.Navigator>
  );
}
