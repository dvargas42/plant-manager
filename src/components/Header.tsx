import React from 'react'
import {
  Platform,
  StyleSheet,
  Image,
  Text,
  View,
} from 'react-native'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'

import userImg from '../assets/avatar.jpeg' 

import colors from '../styles/colors'
import fonts from  '../styles/fonts'

export function Header() {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.greeting}>Olá,</Text>
        <Text style={styles.userName}>Daniel</Text>
        
      </View>
      <Image
          style={styles.avatar} 
          source={userImg}
        />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    marginTop: Platform.OS === 'ios' ? getStatusBarHeight() + 20 : 20,
  },

  avatar: {
    width: 70,
    height: 70,
    borderRadius: 56,
  },

  greeting: {
    fontSize: 32,
    color: colors.heading,
    fontFamily: fonts.text,
  },

  userName: {
    fontSize: 32,
    fontFamily: fonts.heading,
    color: colors.heading,
    lineHeight: 40,
  }
})