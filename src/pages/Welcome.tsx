import React from 'react'
import { Dimensions, Image, Platform, SafeAreaView, StyleSheet, Text, View } from  'react-native'
import { Feather } from '@expo/vector-icons'

import wateringImg from '../assets/watering.png'
import { WelcomeButton } from '../components/WelcomeButton'

import colors from '../styles/colors'
import fonts from '../styles/fonts'


export function Welcome() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text style={styles.title}>
          Gerencie {'\n'}suas plantas de{'\n'}forma fácil
        </Text>

        <Image 
          style={styles.image}
          source={wateringImg}
          resizeMode="contain"
        />

        <Text style={styles.subtitle}>
          Não esqueça mais de regar suas plantas.
          Nós cuidamos de lembrar você sempre que precisar.
        </Text>

        <WelcomeButton>
          <Feather
            name="chevron-right"
            style={styles.buttonIcon}
          />
        </WelcomeButton>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? 10 : 0
  },

  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginHorizontal: 10,
  },

  title: {
    fontSize: 28,
    //fontWeight: 'bold',
    textAlign: 'center',
    color: colors.heading,
    fontFamily: fonts.heading,
    marginTop: 38,
    lineHeight: 34,
  },

  subtitle: {
    textAlign: 'center',
    fontSize: 18,
    paddingHorizontal: 20,
    color: colors.heading,
    fontFamily: fonts.heading,
  },

  image: {
    height: Dimensions.get('window').width * 0.7
  },

  buttonIcon: {
    fontSize: 32,
    color: colors.white,
  }
})