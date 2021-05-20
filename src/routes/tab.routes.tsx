import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { MaterialIcons } from '@expo/vector-icons'

import { PlantSelect } from '../pages/PlantSelect'

import colors from '../styles/colors'
import { MyPlants } from '../pages/MyPlants'
import { Platform } from 'react-native'

const AppTab = createBottomTabNavigator()

const AuthRoutes = () => {
  return (
    <AppTab.Navigator
      tabBarOptions={{
        activeTintColor: colors.green,
        inactiveTintColor: colors.heading,
        labelPosition: 'beside-icon',
        style: {
          paddingTop: 20,
          paddingBottom: Platform.OS === 'android' ? 30 : 20,
          height: Platform.OS === 'android' ? 60 : 80,
        }
    }}>
      <AppTab.Screen 
        name="Nova Planta"
        component={PlantSelect}
        options={{
          tabBarIcon: (({ size, color}) => (
            <MaterialIcons
              name="add-circle-outline"
              size={size}
              color={color}
            />
          ))
        }}
      />

      <AppTab.Screen 
        name="Minhas Plantas"
        component={MyPlants}
        options={{
          tabBarIcon: (({ size, color}) => (
            <MaterialIcons
              name="format-list-bulleted"
              size={size}
              color={color}
            />
          ))
        }}
      />
    </AppTab.Navigator>
  )
}

export default AuthRoutes