import React from 'react'
import { Image, Platform, SafeAreaView, StyleSheet, Text, TouchableOpacity } from  'react-native'

import wateringImg from '../assets/watering.png'
import { Button } from '../components/Button'

import { colors } from '../styles/colors'


export function Welcome() {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        Gerencie {'\n'}suas plantas de {'\n'}forma fácil
      </Text>

      <Image style={styles.image} source={wateringImg}/>

      <Text style={styles.subtitle}>
        Não esqueça maid e regar suas plantas.
        Nós cuidamos de lembrar você sempre que precisar.
      </Text>

      <Button title={'>'} />

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'android' ? 25 : 0
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    color: colors.heading,
    marginTop: 38,
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 18,
    paddingHorizontal: 20,
    color: colors.heading,
  },
  image: {
    width: 292,
    height: 284
  },
})